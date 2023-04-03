import { Module } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { UserPasswordController } from './user-password.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_password } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([user_password])],
  controllers: [UserPasswordController],
  providers: [UserPasswordService],
})
export class UserPasswordModule {}
