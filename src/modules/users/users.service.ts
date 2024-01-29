import { Injectable } from '@nestjs/common';
import { ConnectFirebaseService } from 'src/services/connect-firebase/connect-firebase.service';

@Injectable()
export class UsersService {
  private users: Array<string> = [];
  constructor(private connectFirebase: ConnectFirebaseService) {}

  public async getUserEmails(): Promise<string[]> {
    this.users = await this.connectFirebase.getUsers();
    return this.users;
  }
}
