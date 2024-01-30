import { Injectable, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

@Injectable()
export class FirebaseService {
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

  public async getUsers(): Promise<string[]> {
    try {
      const userData = await this.firebase.auth().listUsers();
      const userArray = userData.users;
      // At the moment only email-password based registration is used
      const users = userArray.map((user) => user.email!);
      return users;
    } catch (error) {
      return [];
    }
  }
}

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
