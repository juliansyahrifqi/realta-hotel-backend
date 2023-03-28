import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { policy_category_group } from '../../models/master_module';
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
  ): Promise<policy_category_group> {
    return this.policyCategoryGroupModel.create(createPolicyCategoryGroupDto);
  }

  async findAll(): Promise<policy_category_group[]> {
    return this.policyCategoryGroupModel.findAll();
  }

  async findOne(
    poca_poli_id: number,
    poca_cagro_id: number,
  ): Promise<policy_category_group> {
    return this.policyCategoryGroupModel.findOne({
      where: { poca_poli_id, poca_cagro_id },
    });
  }

  async update(
    poca_poli_id: number,
    poca_cagro_id: number,
    updatePolicyCategoryGroupDto: UpdatePolicyCategoryGroupDto,
  ): Promise<policy_category_group> {
    await this.policyCategoryGroupModel.update(updatePolicyCategoryGroupDto, {
      where: { poca_poli_id, poca_cagro_id },
    });
    return this.findOne(poca_poli_id, poca_cagro_id);
  }

  async remove(poca_poli_id: number, poca_cagro_id: number): Promise<void> {
    const policyCategoryGroup = await this.findOne(poca_poli_id, poca_cagro_id);
    await policyCategoryGroup.destroy();
  }
}
