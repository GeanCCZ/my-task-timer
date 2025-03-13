import { Module } from '@nestjs/common';
import { AccountUsersResourceModule } from '@my-task-timer/account-users-resource';

@Module({
  imports: [AccountUsersResourceModule],
})
export class AppModule { }
