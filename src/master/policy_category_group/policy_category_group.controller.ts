import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PolicyCategoryGroupService } from './policy_category_group.service';
import { CreatePolicyCategoryGroupDto } from './dto/create-policy_category_group.dto';
import { UpdatePolicyCategoryGroupDto } from './dto/update-policy_category_group.dto';

@Controller('policy-category-group')
export class PolicyCategoryGroupController {
  constructor(
    private readonly policyCategoryGroupService: PolicyCategoryGroupService,
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.policyCategoryGroupService.findAll();
  }

  @Get(':poca_poli_id/:poca_cagro_id')
  async findOne(
    @Param('poca_poli_id') poca_poli_id: number,
    @Param('poca_cagro_id') poca_cagro_id: number,
  ): Promise<any> {
    return this.policyCategoryGroupService.findOne(poca_poli_id, poca_cagro_id);
  }

  @Post()
  async create(
    @Body() createPolicyCategoryGroupDto: CreatePolicyCategoryGroupDto,
  ): Promise<any> {
    return this.policyCategoryGroupService.create(createPolicyCategoryGroupDto);
  }

  @Put(':poca_poli_id/:poca_cagro_id')
  async update(
    @Param('poca_poli_id') poca_poli_id: number,
    @Param('poca_cagro_id') poca_cagro_id: number,
    @Body() updatePolicyCategoryGroupDto: UpdatePolicyCategoryGroupDto,
  ): Promise<any> {
    return this.policyCategoryGroupService.update(
      poca_poli_id,
      poca_cagro_id,
      updatePolicyCategoryGroupDto,
    );
  }

  @Delete(':poca_poli_id/:poca_cagro_id')
  async remove(
    @Param('poca_poli_id') poca_poli_id: number,
    @Param('poca_cagro_id') poca_cagro_id: number,
  ): Promise<any> {
    return this.policyCategoryGroupService.remove(poca_poli_id, poca_cagro_id);
  }
}
