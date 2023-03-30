import { Injectable, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { user_profiles, user_roles, users } from 'models/usersSchema';
import { SignUpGuestDto } from './dto/signup-guest.dto';
import { SignUpEmployeeDto } from './dto/signup-employee.dto';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(users) private readonly userModel: typeof users,
    @InjectModel(user_profiles)
    private readonly userProfileModel: typeof user_profiles,
    @InjectModel(user_roles) private readonly userRolesModel: typeof user_roles,
    private sequelize: Sequelize,
  ) {}

  getUserByEmail(email: string) {
    return this.userModel.findOne({ where: { user_email: email } });
  }

  async getUserById(id: number) {
    return await this.userModel.findOne({ where: { user_id: id } });
  }

  async getUserJoinById(id: number) {
    return await this.sequelize.query(
      'SELECT * FROM get_user_data(:user_id);',
      {
        replacements: {
          user_id: id,
        },
        type: QueryTypes.SELECT,
      },
    );
  }

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

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const t = await this.sequelize.transaction();

    try {
      await this.userModel.update(
        {
          user_full_name: updateUserDto.user_full_name,
          user_type: updateUserDto.user_type,
          user_company_name: updateUserDto.user_company_name,
          user_email: updateUserDto.user_email,
          user_phone_number: updateUserDto.user_phone_number,
          user_hotel_id: updateUserDto.user_hotel_id,
          user_photo_profile: updateUserDto.user_photo_profile,
          user_modified_date: new Date(),
        },
        { where: { user_id: id }, transaction: t },
      );

      await this.userProfileModel.update(
        {
          uspro_national_id: updateUserDto.uspro_national_id,
          uspro_job_title: updateUserDto.uspro_job_title,
          uspro_gender: updateUserDto.uspro_gender,
          uspro_birt_date: updateUserDto.uspro_birt_date,
          uspro_marital_status: updateUserDto.uspro_marital_status,
        },
        { where: { uspro_user_id: id }, transaction: t },
      );

      await this.userRolesModel.update(
        {
          usro_role_id: updateUserDto.usro_role_id,
        },
        { where: { usro_role_id: id }, transaction: t },
      );

      await t.commit();

      return { statusCode: HttpStatus.OK, message: 'User success update' };
    } catch (e) {
      await t.rollback();

      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  async getUserByName(search: string) {
    try {
      const result = await this.userModel.findAll({
        where: {
          user_full_name: {
            [Op.iLike]: `${search}`,
          },
        },
        limit: 5,
      });

      if (result.length === 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Users Not Found',
          data: result,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Users Found',
        data: result,
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }
}
