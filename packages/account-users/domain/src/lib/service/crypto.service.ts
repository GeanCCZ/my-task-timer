import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoServiceInterface } from '@my-task-timer/shared-interfaces';
import { createHmac, pbkdf2 as pbkdf2Callback, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const pbkdf2 = promisify(pbkdf2Callback);

@Injectable()
export class CryptoService implements CryptoServiceInterface {
  private readonly iterations = 10000;
  private readonly keyLength = 64;
  private readonly digest = 'sha512';
  private readonly pepper: string;

  constructor(configService: ConfigService) {
    this.pepper = configService.get<string>('PASSWORD_PEPPER') as string;
    if (!this.pepper) {
      throw new Error('No pepper found for this project');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = await this.deriveKey(password, salt, this.iterations);
    return `${salt}.${this.iterations}.${derivedKey}`;
  }

  async compare(password: string, storedHash: string): Promise<boolean> {
    const [salt, iterationsStr, hash] = storedHash.split('.');
    const iterations = parseInt(iterationsStr, 10);
    const derivedKey = await this.deriveKey(password, salt, iterations);
    return derivedKey === hash;
  }

  private async deriveKey(password: string, salt: string, iterations: number): Promise<string> {
    const pepperedPassword = this.applyPepper(password);
    const derivedKey = await pbkdf2(pepperedPassword, salt, iterations, this.keyLength, this.digest);
    return derivedKey.toString('hex');
  }

  private applyPepper(password: string): string {
    return createHmac('sha256', this.pepper).update(password).digest('hex');
  }
}
