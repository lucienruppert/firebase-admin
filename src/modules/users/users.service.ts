import { Injectable } from '@nestjs/common';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Injectable()
export class UsersService {
  private users: Array<string> = [];
  private user: UserRecord | undefined;
  constructor(private firebaseService: FirebaseService) {}

  public async getUserEmails(): Promise<string[]> {
    this.users = await this.firebaseService.getUsers();
    return this.users;
  }

  public async getUserByEmailByBody(email: string): Promise<UserRecord> {
    this.user = await this.firebaseService.getUserByEmail(email);
    return this.user;
  }
}
