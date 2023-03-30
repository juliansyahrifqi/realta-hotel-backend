import { PartialType } from '@nestjs/mapped-types';
import { CreatePolicyCategoryGroupDto } from './create-policy_category_group.dto';

export class UpdatePolicyCategoryGroupDto extends PartialType(CreatePolicyCategoryGroupDto) {}
