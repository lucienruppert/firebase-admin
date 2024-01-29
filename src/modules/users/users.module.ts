import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConnectFirebaseService } from 'src/services/connect-firebase/connect-firebase.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ConnectFirebaseService],
})
export class UsersModule {}
