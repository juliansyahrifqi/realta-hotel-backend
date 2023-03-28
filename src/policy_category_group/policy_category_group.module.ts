// policy-category-group.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { policy_category_group } from '../../models/master_module';
import { PolicyCategoryGroupController } from './policy_category_group.controller';
import { PolicyCategoryGroupService } from './policy_category_group.service';

@Module({
  imports: [SequelizeModule.forFeature([policy_category_group])],
  controllers: [PolicyCategoryGroupController],
  providers: [PolicyCategoryGroupService],
})
export class PolicyCategoryGroupModule {}
