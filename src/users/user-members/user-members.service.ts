import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_members } from 'models/usersSchema';
import { CreateUserMemberDto } from './dto/create-user-member.dto';
import { UpdateUserMemberDto } from './dto/update-user-member.dto';
import { CreateOrUpdateUserMemberDto } from './dto/create-or-update-member.dto';

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

  private async isUserMemberExist(
    id: number,
    membName: string,
  ): Promise<boolean> {
    const userMember = await this.userMembersModel.findOne({
      where: {
        usme_user_id: id,
        usme_memb_name: membName,
      },
    });

    if (!userMember) {
      return false;
    }

    return true;
  }

  async createOrUpdateserMember(
    id: number,
    createOrUpdateUserMember: CreateOrUpdateUserMemberDto,
  ) {
    try {
      const userMembers = await this.userMembersModel.findOne({
        where: {
          usme_user_id: id,
        },
      });

      if (!userMembers) {
        return await this.userMembersModel.create({
          usme_user_id: id,
          usme_memb_name: 'SILVER',
          usme_points: createOrUpdateUserMember.usme_points,
          usme_promote_date: new Date(),
          usme_type: 'default',
        });
      }

      const totalPoint = await this.userMembersModel.sum('usme_points', {
        where: {
          usme_user_id: id,
        },
      });

      if (totalPoint >= 0 && totalPoint <= 1000) {
        return await this.userMembersModel.update(
          {
            usme_points:
              Number(createOrUpdateUserMember.usme_points) + Number(totalPoint),
          },
          {
            where: { usme_user_id: id, usme_memb_name: 'SILVER' },
          },
        );
      }

      if (totalPoint > 1000 && totalPoint <= 2000) {
        const userMemberExists = await this.isUserMemberExist(id, 'GOLD');

        if (userMemberExists) {
          return await this.userMembersModel.update(
            {
              usme_points:
                Number(createOrUpdateUserMember.usme_points) +
                Number(totalPoint),
            },
            {
              where: { usme_user_id: id },
            },
          );
        }

        return await this.userMembersModel.create({
          usme_user_id: id,
          usme_memb_name: 'GOLD',
          usme_points:
            createOrUpdateUserMember.usme_points + Number(totalPoint),
          usme_promote_date: new Date(),
          usme_type: 'default',
        });
      }

      if (totalPoint > 2000 && totalPoint <= 3000) {
        const userMemberExists = await this.isUserMemberExist(id, 'VIP');

        if (userMemberExists) {
          return await this.userMembersModel.update(
            {
              usme_points:
                Number(createOrUpdateUserMember.usme_points) +
                Number(totalPoint),
            },
            {
              where: { usme_user_id: id },
            },
          );
        }

        return await this.userMembersModel.create({
          usme_user_id: id,
          usme_memb_name: 'VIP',
          usme_points:
            Number(createOrUpdateUserMember.usme_points) + Number(totalPoint),
          usme_promote_date: new Date(),
          usme_type: 'default',
        });
      }

      if (totalPoint > 3000) {
        const userMemberExists = await this.isUserMemberExist(id, 'WIZARD');

        if (userMemberExists) {
          return await this.userMembersModel.update(
            {
              usme_points:
                Number(createOrUpdateUserMember.usme_points) +
                Number(totalPoint),
            },
            {
              where: { usme_user_id: id },
            },
          );
        }

        return await this.userMembersModel.create({
          usme_user_id: id,
          usme_memb_name: 'WIZARD',
          usme_points:
            createOrUpdateUserMember.usme_points + Number(totalPoint),
          usme_promote_date: new Date(),
          usme_type: 'default',
        });
      }
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} userMember`;
  // }
}
