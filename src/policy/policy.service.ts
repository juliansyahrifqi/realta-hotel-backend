import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { policy } from '../../models/master_module';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectModel(policy)
    private policyModel: typeof policy,
  ) {}

  async create(createPolicyDto: CreatePolicyDto): Promise<any> {
    console.log(createPolicyDto);
    return this.policyModel.create(createPolicyDto);
  }

  async findAll(): Promise<policy[]> {
    return this.policyModel.findAll();
  }

  async findOne(id: number): Promise<any> {
    return this.policyModel.findByPk(id);
  }

  async update(id: number, updatePolicyDto: UpdatePolicyDto): Promise<any> {
    const [numRows, [updatedPolicy]] = await this.policyModel.update(
      updatePolicyDto,
      {
        returning: true,
        where: { poli_id: id },
      },
    );
    if (numRows < 1) {
      throw new Error(`Policy with ID ${id} not found.`);
    }
    return updatedPolicy;
  }

  async findAllSearch(searchQuery: string): Promise<policy[]> {
    try {
      const data = await this.policyModel.findAll({
        where: {
          poli_name: { [Op.like]: `%${searchQuery}%` },
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async delete(id: number): Promise<any> {
    const numRows = await this.policyModel.destroy({ where: { poli_id: id } });
    if (numRows < 1) {
      throw new Error(`Policy with ID ${id} not found.`);
    }
  }
}
