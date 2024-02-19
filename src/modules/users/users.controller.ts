import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('one')
  public async getUserByEmail(
    @Body('email') email: string,
  ): Promise<UserRecord> {
    const result = await this.usersService.getUserByEmail(email);
    return result;
  }

  @Post('multiple')
  public async getUsersByEmail(
    @Body('emails') userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    const result = await this.usersService.getUsersByEmail(userEmails);
    return result;
  }
}
