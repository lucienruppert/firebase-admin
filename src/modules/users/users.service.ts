import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { GetUsersResult } from 'firebase-admin/lib/auth/base-auth';
import { UserIdentifier } from 'firebase-admin/lib/auth/identifier';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';

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

  public async getUsersByEmail(
    userEmails: Array<UserIdentifier>,
  ): Promise<GetUsersResult> {
    try {
      const usersData: GetUsersResult = await this.firebase
        .auth()
        .getUsers(userEmails);
      return usersData;
    } catch (error) {
      throw new Error('Failed to retrieve users data with error: ' + error);
    }
  }

  public async createUser(properties: CreateRequest): Promise<UserRecord> {
    try {
      const userRecords = await this.firebase.auth().createUser(properties);
      return userRecords;
    } catch (error) {
      throw new Error('Failed to create users with error: ' + error);
    }
  }
}
