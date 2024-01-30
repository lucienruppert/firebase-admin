import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { FirebaseModule } from './services/firebase/firebase.service';

@Module({
  imports: [UsersModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
