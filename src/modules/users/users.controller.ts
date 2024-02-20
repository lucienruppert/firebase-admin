import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async dummyRoute(): Promise<string> {
    return 'Dummy route';
  }

  @Post('list')
  public async getUsersByEmail(
    @Body('emails') userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    const result = await this.usersService.getUsersByEmail(userEmails);
    return result;
  }

  @Post('create')
  public async createUser(
    @Body('properties') properties: CreateRequest,
  ): Promise<UserRecord> {
    const result = await this.usersService.createUser(properties);
    return result;
  }
}
