import { Module } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { UserPasswordController } from './user-password.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_password, users } from 'models/usersSchema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([user_password, users]), MailModule],
  controllers: [UserPasswordController],
  providers: [UserPasswordService],
})
export class UserPasswordModule {}
