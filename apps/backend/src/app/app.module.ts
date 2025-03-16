import { Module } from '@nestjs/common';
import { AccountUsersResourceModule } from '@my-task-timer/account-users-resource';
import { DrizzleModule } from '../db/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { environment } from '../../../../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => environment],
    }),
    DrizzleModule,
    AccountUsersResourceModule],
})
export class AppModule { }
