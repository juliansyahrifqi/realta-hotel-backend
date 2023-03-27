import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_profiles, user_roles, users } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([users, user_profiles, user_roles])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
