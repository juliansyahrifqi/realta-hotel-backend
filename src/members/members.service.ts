// members.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { members } from '../../models/master_module';
import { CreateMembersDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(members)
    private readonly membersModel: typeof members,
  ) {}

  async create(createMembersDto: CreateMembersDto): Promise<members> {
    return this.membersModel.create(createMembersDto);
  }

  async findAll(): Promise<members[]> {
    return this.membersModel.findAll();
  }

  async findOne(memb_name: string): Promise<members> {
    return this.membersModel.findOne({
      where: { memb_name },
    });
  }

  async update(
    memb_name: string,
    updateMembersDto: CreateMembersDto,
  ): Promise<members> {
    await this.membersModel.update(updateMembersDto, {
      where: { memb_name },
    });
    return this.findOne(memb_name);
  }

  async delete(memb_name: string): Promise<void> {
    const members = await this.findOne(memb_name);
    await members.destroy();
  }
}
