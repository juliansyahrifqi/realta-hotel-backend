import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_password } from 'models/usersSchema';
import { CreateOrUpdateUserPasswordDto } from './dto/create-update-user-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordService {
  constructor(
    @InjectModel(user_password) private userPasswordModel: typeof user_password,
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
}
