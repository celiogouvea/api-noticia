import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.contoller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers:[UserController],
  providers: [
    ...UserProviders,
    UserService,
  ],
})
export class UserModule {}