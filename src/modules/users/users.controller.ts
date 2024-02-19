import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public getUserEmails(): Promise<string[]> {
    return this.usersService.getUserEmails();
  }

  @Post('single')
  public getUserByEmail(@Body('email') email: string): Promise<UserRecord> {
    return this.usersService.getUserByEmail(email);
  }

  @Post('multiple')
  public getUsersByEmail(
    @Body('emails') userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    return this.usersService.getUsersByEmail(userEmails);
  }
}
