import { Module } from '@nestjs/common';
import { UserMembersService } from './user-members.service';
import { UserMembersController } from './user-members.controller';
import { user_members } from 'models/usersSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([user_members])],
  controllers: [UserMembersController],
  providers: [UserMembersService],
})
export class UserMembersModule {}
