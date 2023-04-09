import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models/usersSchema';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([users]), MailModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
