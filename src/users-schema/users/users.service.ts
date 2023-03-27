import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { users } from '../../../models/usersSchema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(users)
    private usersModel: typeof users,
  ) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<users> {
    const result = await this.usersModel.create(createUserDto);
    return result;
  }

  async findAll(): Promise<users[]> {
    const result = await this.usersModel.findAll();
    return result;
  }

  async findOne(user_id: number) {
    const result = await this.usersModel.findByPk(user_id);
    return result;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<any> {
    await this.usersModel.update(updateUserDto, {
      where: { user_id },
    });
    return `updated user_id : ${user_id} success`;
  }

  async remove(user_id: number): Promise<any> {
    await this.usersModel.destroy({
      where: { user_id },
    });
    return `deleted user_id : ${user_id} success`;
  }
}
