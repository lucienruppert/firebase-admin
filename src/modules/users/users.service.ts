import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Injectable()
export class UsersService {
  private users: Array<string> = [];
  constructor(private connectFirebase: FirebaseService) {}

  public async getUserEmails(): Promise<string[]> {
    this.users = await this.connectFirebase.getUsers();
    return this.users;
  }
}
