import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { policy_category_group } from '../../models/masterSchema';
import { CreatePolicyCategoryGroupDto } from './dto/create-policy_category_group.dto';
import { UpdatePolicyCategoryGroupDto } from './dto/update-policy_category_group.dto';

@Injectable()
export class PolicyCategoryGroupService {
  constructor(
    @InjectModel(policy_category_group)
    private readonly policyCategoryGroupModel: typeof policy_category_group,
  ) {}

  async create(
    createPolicyCategoryGroupDto: CreatePolicyCategoryGroupDto,
  ): Promise<any> {
    try {
      const newPolicyCategoryGroup = await this.policyCategoryGroupModel.create(
        createPolicyCategoryGroupDto,
      );
      return { message: 'Data created', data: newPolicyCategoryGroup };
    } catch (error) {
      return { message: 'Error creating data', error: error.message };
    }
  }

  async findAll(): Promise<any> {
    try {
      const policyCategoryGroups =
        await this.policyCategoryGroupModel.findAll();
      return { message: 'Data found', data: policyCategoryGroups };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findOne(poca_poli_id: number, poca_cagro_id: number): Promise<any> {
    try {
      const policyCategoryGroup = await this.policyCategoryGroupModel.findOne({
        where: { poca_poli_id, poca_cagro_id },
      });
      if (policyCategoryGroup) {
        return { message: 'Data found', data: policyCategoryGroup };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async update(
    poca_poli_id: number,
    poca_cagro_id: number,
    updatePolicyCategoryGroupDto: UpdatePolicyCategoryGroupDto,
  ): Promise<any> {
    try {
      await this.policyCategoryGroupModel.update(updatePolicyCategoryGroupDto, {
        where: { poca_poli_id, poca_cagro_id },
      });
      const policyCategoryGroup = await this.findOne(
        poca_poli_id,
        poca_cagro_id,
      );
      return { message: 'Data updated', data: policyCategoryGroup };
    } catch (error) {
      return { message: 'Error updating data', error: error.message };
    }
  }

  async remove(poca_poli_id: number, poca_cagro_id: number): Promise<any> {
    try {
      const policyCategoryGroup = await this.findOne(
        poca_poli_id,
        poca_cagro_id,
      );
      await policyCategoryGroup.destroy();
      return { message: 'Data deleted' };
    } catch (error) {
      return { message: 'Error deleting data', error: error.message };
    }
  }
}
