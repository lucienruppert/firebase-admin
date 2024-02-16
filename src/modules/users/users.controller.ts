import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public getUsers(): Promise<string[]> {
    return this.usersService.getUserEmails();
  }

  @Post()
  public getUserByEmail(@Body('email') email: string): Promise<UserRecord> {
    return this.usersService.getUserByEmailByBody(email);
  }
}
