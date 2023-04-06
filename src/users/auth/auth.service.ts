import { Injectable, HttpStatus } from '@nestjs/common';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { LoginGuestDto } from './dto/login-guest.dto';
import { InjectModel } from '@nestjs/sequelize';
import { user_password, user_roles, users } from 'models/usersSchema';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(users) private userModel: typeof users,
    @InjectModel(user_password) private userPasswordModel: typeof user_password,
    @InjectModel(user_roles) private userRoleModel: typeof user_roles,
  ) {}

  async loginEmployee(loginEmployeeDto: LoginEmployeeDto) {
    try {
      const user = await this.userModel.findOne({
        where: {
          user_email: loginEmployeeDto.email,
        },
      });

      if (user === null) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }

      const userRole = await this.userRoleModel.findOne({
        where: { usro_user_id: user.user_id },
      });

      const userPassword = await this.userPasswordModel.findOne({
        where: { uspa_user_id: user.user_id },
      });

      if (userPassword === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password is wrong',
        };
      }

      const isValid = await bcrypt.compare(
        loginEmployeeDto.password,
        userPassword.uspa_passwordhash,
      );

      if (!isValid) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password is wrong',
        };
      }

      const loginData = {
        user_id: user.user_id,
        user_full_name: user.user_full_name,
        user_email: user.user_email,
        user_phone_number: user.user_phone_number,
        user_role_id: userRole.usro_role_id,
        user_hotel_id: user.user_hotel_id,
        user_modified_date: user.user_modified_date,
      };

      const token = sign(
        {
          user_id: user.user_id,
          user_full_name: user.user_full_name,
          user_email: user.user_email,
          user_phone_number: user.user_phone_number,
          user_role_id: userRole.usro_role_id,
          user_hotel_id: user.user_hotel_id,
          user_modified_date: user.user_modified_date,
        },
        process.env.SECRET_KEY,
      );

      return { statusCode: HttpStatus.OK, token: token, loginData: loginData };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  async loginGuest(loginGuestDto: LoginGuestDto) {
    try {
      const user = await this.userModel.findOne({
        where: { user_phone_number: loginGuestDto.phone_number },
      });

      if (user === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Phone number is not registered',
        };
      }

      const userRole = await this.userRoleModel.findOne({
        where: { usro_user_id: user.user_id },
      });

      const loginData = {
        user_id: user.user_id,
        user_full_name: user.user_full_name,
        user_email: user.user_email,
        user_phone_number: user.user_phone_number,
        user_role_id: userRole.usro_role_id,
        user_hotel_id: user.user_hotel_id,
        user_modified_date: user.user_modified_date,
      };

      const token = sign(
        {
          user_id: user.user_id,
          user_full_name: user.user_full_name,
          user_email: user.user_email,
          user_phone_number: user.user_phone_number,
          user_role_id: userRole.usro_role_id,
          user_hotel_id: user.user_hotel_id,
          user_modified_date: user.user_modified_date,
        },
        process.env.SECRET_KEY,
      );

      return { statusCode: HttpStatus.OK, token: token, loginData: loginData };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }
}
