// members.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { members } from '../../../models/masterSchema';
import { CreateMembersDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(members)
    private readonly membersModel: typeof members,
  ) {}

  async create(createMembersDto: CreateMembersDto): Promise<any> {
    try {
      const newMember = await this.membersModel.create(createMembersDto);
      return { message: 'Data has been created successfully', data: newMember };
    } catch (error) {
      return { message: 'Failed to create data', error: error.message };
    }
  }

  async findAll(): Promise<any> {
    try {
      const members = await this.membersModel.findAll();
      return { message: 'Data has been retrieved successfully', data: members };
    } catch (error) {
      return { message: 'Failed to retrieve data', error: error.message };
    }
  }

  async findOne(memb_name: string): Promise<any> {
    try {
      const member = await this.membersModel.findOne({
        where: { memb_name },
      });
      if (member) {
        return {
          message: 'Data has been retrieved successfully',
          data: member,
        };
      } else {
        return { message: 'Data not found', data: null };
      }
    } catch (error) {
      return { message: 'Failed to retrieve data', error: error.message };
    }
  }

  async update(
    memb_name: string,
    updateMembersDto: CreateMembersDto,
  ): Promise<any> {
    try {
      const member = await this.membersModel.findOne({
        where: { memb_name },
      });
      if (!member) {
        return { message: 'Data not found', data: null };
      }
      const updatedMember = await member.update(updateMembersDto);
      return {
        message: 'Data has been updated successfully',
        data: updatedMember,
      };
    } catch (error) {
      return { message: 'Failed to update data', error: error.message };
    }
  }

  async delete(memb_name: string): Promise<any> {
    try {
      const member = await this.membersModel.findOne({ where: { memb_name } });
      if (!member) {
        return { message: 'Data not found', data: null };
      }
      return {
        message: 'Data has been deleted successfully',
      };
    } catch (error) {
      return { message: 'Failed to delete data', error: error.message };
    }
  }
}
