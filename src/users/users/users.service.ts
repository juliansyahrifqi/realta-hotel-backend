import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { users } from 'models/usersSchema';
import { SignUpGuestDto } from './dto/signup-guest.dto';
import { SignUpEmployeeDto } from './dto/signup-employee.dto';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(users) private readonly userModel: typeof users,
    private sequelize: Sequelize,
  ) {}

  async signUpGuest(signUpGuestDto: SignUpGuestDto) {
    return await this.sequelize.query('CALL signUpGuest(:phone_number);', {
      replacements: {
        phone_number: signUpGuestDto.phone_number,
      },
    });
  }

  async signUpEmployee(signUpEmployeeDto: SignUpEmployeeDto) {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(signUpEmployeeDto.password, salt);

    return await this.sequelize.query(
      'CALL signUpEmployee(:username, :email, :password, :passwordSalt, :phone_number);',
      {
        replacements: {
          username: signUpEmployeeDto.username,
          email: signUpEmployeeDto.email,
          password: passHash,
          passwordSalt: salt,
          phone_number: signUpEmployeeDto.phone_number,
        },
      },
    );
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
