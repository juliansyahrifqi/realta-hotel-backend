import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { policy } from '../../models/masterSchema';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectModel(policy)
    private policyModel: typeof policy,
  ) {}

  async create(createPolicyDto: CreatePolicyDto): Promise<any> {
    try {
      const newPolicy = await this.policyModel.create(createPolicyDto);
      return { message: 'Policy created', data: newPolicy };
    } catch (error) {
      return { message: 'Error creating policy', error: error.message };
    }
  }

  async findAll(): Promise<any> {
    try {
      const policies = await this.policyModel.findAll();
      return { message: 'Policies found', data: policies };
    } catch (error) {
      return { message: 'Error fetching policies', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const policy = await this.policyModel.findByPk(id);
      if (policy) {
        return { message: 'Policy found', data: policy };
      } else {
        return { message: 'Policy not found' };
      }
    } catch (error) {
      return { message: 'Error fetching policy', error: error.message };
    }
  }

  async update(id: number, updatePolicyDto: UpdatePolicyDto): Promise<any> {
    try {
      const [numRows, [updatedPolicy]] = await this.policyModel.update(
        updatePolicyDto,
        {
          returning: true,
          where: { poli_id: id },
        },
      );
      if (numRows < 1) {
        return { message: `Policy with ID ${id} not found.` };
      }
      return { message: 'Policy updated successfully', data: updatedPolicy };
    } catch (error) {
      return { message: 'Error updating policy', error: error.message };
    }
  }

  async findAllSearch(poli_name: string): Promise<any> {
    try {
      const data = await this.policyModel.findAll({
        where: {
          poli_name: { [Op.iLike]: `%${poli_name}%` },
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const numRows = await this.policyModel.destroy({
        where: { poli_id: id },
      });
      if (numRows < 1) {
        return { message: `Policy with ID ${id} not found.` };
      }
      return { message: 'Policy deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting policy', error: error.message };
    }
  }
}
