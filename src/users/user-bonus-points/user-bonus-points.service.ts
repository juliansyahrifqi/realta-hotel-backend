import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_bonus_points } from 'models/usersSchema';
import { CreateUserBonusPointDto } from './dto/create-user-bonus-point.dto';
import { UpdateUserBonusPointDto } from './dto/update-user-bonus-point.dto';

@Injectable()
export class UserBonusPointsService {
  constructor(
    @InjectModel(user_bonus_points)
    private userBonusPointsModel: typeof user_bonus_points,
  ) {}

  create(createUserBonusPointDto: CreateUserBonusPointDto) {
    return this.userBonusPointsModel.create(createUserBonusPointDto);
  }

  getUserBonusPoints(user_id: number) {
    return this.userBonusPointsModel.findAll({
      where: { ubpo_user_id: user_id },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userBonusPoint`;
  }

  updateUserBonusPoints(
    id: number,
    updateUserBonusPointDto: UpdateUserBonusPointDto,
  ) {
    return this.userBonusPointsModel.update(updateUserBonusPointDto, {
      where: { ubpo_id: id },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} userBonusPoint`;
  // }
}
