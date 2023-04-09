import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_password, users } from 'models/usersSchema';
import { CreateOrUpdateUserPasswordDto } from './dto/create-update-user-password.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { decode, sign, verify } from 'jsonwebtoken';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface JwtPayload {
  user_email: string;
}

@Injectable()
export class UserPasswordService {
  constructor(
    @InjectModel(user_password) private userPasswordModel: typeof user_password,
    @InjectModel(users) private userModel: typeof users,
    private mailService: MailService,
  ) {}

  findOne(id: number) {
    return this.userPasswordModel.findOne({ where: { uspa_user_id: id } });
  }

  async createOrUpdate(
    user_id: number,
    createOrUpdateUserPasswordDto: CreateOrUpdateUserPasswordDto,
  ) {
    const user = await this.userPasswordModel.findOne({
      where: { uspa_user_id: user_id },
    });

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(
      createOrUpdateUserPasswordDto.new_password,
      salt,
    );

    if (user === null) {
      return await this.userPasswordModel.create({
        uspa_user_id: user_id,
        uspa_passwordhash: passHash,
        uspa_passwordsalt: salt,
      });
    }

    if (user !== null || user.uspa_passwordhash === null)
      return await this.userPasswordModel.update(
        {
          uspa_passwordhash: passHash,
          uspa_passwordsalt: salt,
        },
        { where: { uspa_user_id: user_id } },
      );
  }

  async forgotPassword(email: string) {
    try {
      // const token = Math.floor(1000 + Math.random() * 9000).toString();
      const user = await this.userModel.findOne({
        where: {
          user_email: email,
        },
      });

      if (!user) {
        return { statusCode: 404, message: 'User not found' };
      }

      const token = sign(
        {
          user_email: email,
        },
        process.env.SECRET_KEY,
      );

      await this.mailService.sendEmailForgotPassword(email, token);

      return { statusCode: 200, message: 'An email has sent to your email' };
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const valid = verify(resetPasswordDto.token, process.env.SECRET_KEY);

      if (!valid) {
        return { statusCode: 401, message: 'Not Authorized' };
      }

      const data = decode(resetPasswordDto.token) as JwtPayload;

      const user = await this.userModel.findOne({
        where: {
          user_email: data.user_email,
        },
      });

      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(resetPasswordDto.password, salt);

      await this.userPasswordModel.update(
        { uspa_passwordhash: passHash, uspa_passwordsalt: salt },
        {
          where: {
            uspa_user_id: user.user_id,
          },
        },
      );

      return { statusCode: 200, message: 'Password Success Updated' };
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }
}
