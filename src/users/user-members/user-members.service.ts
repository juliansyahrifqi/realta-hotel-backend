import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_members } from 'models/usersSchema';
import { CreateUserMemberDto } from './dto/create-user-member.dto';
import { UpdateUserMemberDto } from './dto/update-user-member.dto';

@Injectable()
export class UserMembersService {
  constructor(
    @InjectModel(user_members) private userMembersModel: typeof user_members,
  ) {}

  createUserMembers(createUserMemberDto: CreateUserMemberDto) {
    return this.userMembersModel.create(createUserMemberDto);
  }

  getUserMember(user_id: number) {
    return this.userMembersModel.findAll({
      where: {
        usme_user_id: user_id,
      },
    });
  }

  updateUserMember(
    id: number,
    memb_name: string,
    updateUserMemberDto: UpdateUserMemberDto,
  ) {
    return this.userMembersModel.update(updateUserMemberDto, {
      where: { usme_user_id: id, usme_memb_name: memb_name },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} userMember`;
  // }
}
