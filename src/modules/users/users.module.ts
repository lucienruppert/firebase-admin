import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseModule } from 'src/modules/users/users.service';

@Module({
  imports: [FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
