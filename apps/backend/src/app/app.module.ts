import { Module } from '@nestjs/common';
import { AccountUsersResourceModule } from '@my-task-timer/account-users-resource';
import { DrizzleModule } from '../db/drizzle.module';

@Module({
  imports: [
    DrizzleModule,
    AccountUsersResourceModule],
})
export class AppModule { }
