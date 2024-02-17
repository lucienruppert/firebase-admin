import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public getUsers(): Promise<string[]> {
    return this.usersService.getUserEmails();
  }

  @Post()
  public getUserByEmail(@Body('one') email: string): Promise<UserRecord> {
    return this.usersService.getUserByEmailByBody(email);
  }

  @Post()
  public getUsersByEmail(
    @Body('many') userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    return this.usersService.getUsersByEmailByBody(userEmails);
  }
}
