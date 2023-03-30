import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_password, user_roles, users } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([users, user_password, user_roles])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
