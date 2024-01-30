import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FirebaseService],
})
export class UsersModule {}
