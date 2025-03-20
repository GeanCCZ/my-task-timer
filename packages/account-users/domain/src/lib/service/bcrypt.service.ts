import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoServiceInterface } from '@my-task-timer/shared-interfaces';
import { createHmac, pbkdf2, randomBytes } from 'node:crypto';

@Injectable()
export class BcryptService implements CryptoServiceInterface {
  private readonly iterations = 10000;
  private readonly keyLength = 64;
  private readonly digest = 'sha512';

  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const pepperedPassword = this.applyPepper(password);
    const salt = randomBytes(16).toString('hex');
    const derivedKey = await new Promise<string>((resolve, reject) => {
      pbkdf2(pepperedPassword, salt, this.iterations, this.keyLength, this.digest, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey.toString('hex'));
      });
    });
    // Formato: salt.iterations.hash
    return `${salt}.${this.iterations}.${derivedKey}`;
  }

  async compare(password: string, storedHash: string): Promise<boolean> {
    const pepperedPassword = this.applyPepper(password);
    const [salt, iterationsStr, hash] = storedHash.split('.');
    const iterations = parseInt(iterationsStr, 10);
    const derivedKey = await new Promise<string>((resolve, reject) => {
      pbkdf2(pepperedPassword, salt, iterations, this.keyLength, this.digest, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey.toString('hex'));
      });
    });
    return derivedKey === hash;
  }

  private applyPepper(password: string): string {
    const pepper = this.configService.get<string>('PASSWORD_PEPPER');
    if (!pepper) {
      throw new Error('No pepper found for this project');
    }
    return createHmac('sha256', pepper).update(password).digest('hex');
  }
}
