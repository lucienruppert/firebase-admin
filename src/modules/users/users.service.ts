import { Injectable, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';

@Injectable()
export class UsersService {
  private readonly firebase: admin.app.App;

  constructor() {
    dotenv.config();
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY!.replace(/\\n/gm, '\n'),
        clientEmail: process.env.CLIENT_EMAIL,
      }),
    } as admin.ServiceAccount);
    this.firebase = admin.app();
  }

  public async getUserEmails(): Promise<string[]> {
    try {
      const userData = await this.firebase.auth().listUsers();
      const userArray = userData.users;
      // At the moment only email-password based registration is used
      const users = userArray.map((user) => user.email!);
      return users;
    } catch (error) {
      throw new Error('Failed to retrieve users: ' + error);
    }
  }

  public async getUserByEmail(email: string): Promise<UserRecord> {
    try {
      const userData: UserRecord = await this.firebase
        .auth()
        .getUserByEmail(email);
      return userData;
    } catch (error) {
      throw new Error('Failed to retrieve users: ' + error);
    }
  }

  public async getUsersByEmail(
    userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    try {
      const usersData: GetUsersResult = await this.firebase
        .auth()
        .getUsers(userEmails);
      return usersData;
    } catch (error) {
      throw new Error('Failed to retrieve users data: ' + error);
    }
  }
}

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
