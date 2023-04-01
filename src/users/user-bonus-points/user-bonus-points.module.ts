import { Module } from '@nestjs/common';
import { UserBonusPointsService } from './user-bonus-points.service';
import { UserBonusPointsController } from './user-bonus-points.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_bonus_points } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([user_bonus_points])],
  controllers: [UserBonusPointsController],
  providers: [UserBonusPointsService],
})
export class UserBonusPointsModule {}
