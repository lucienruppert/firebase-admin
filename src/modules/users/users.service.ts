import { Injectable } from '@nestjs/common';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Injectable()
export class UsersService {
  private users: Array<string> = [];
  private user: UserRecord | undefined;
  private usersResult: GetUsersResult | undefined;
  constructor(private firebaseService: FirebaseService) {}

  public async getUserEmails(): Promise<string[]> {
    this.users = await this.firebaseService.getUsers();
    return this.users;
  }

  public async getUserByEmailByBody(email: string): Promise<UserRecord> {
    this.user = await this.firebaseService.getUserByEmail(email);
    return this.user;
  }

  public async getUsersByEmailByBody(
    userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    this.usersResult = await this.firebaseService.getUsersByEmail(userEmails);
    return this.usersResult;
  }
}
