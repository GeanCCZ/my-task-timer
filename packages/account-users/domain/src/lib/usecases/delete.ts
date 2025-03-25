import { Usecase } from '@my-task-timer/shared-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUseCase implements Usecase<string, string> {
  async execute(input: string): Promise<string> {
    return Promise<'string'>;
  }
}
