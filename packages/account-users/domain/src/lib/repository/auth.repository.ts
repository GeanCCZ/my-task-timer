import { Create } from '@my-task-timer/shared-interfaces';

export abstract class AuthRepository implements Create<any, any> {
  abstract createOne(input: any): Promise<any>;
}
