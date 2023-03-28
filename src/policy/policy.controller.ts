import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.policyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.policyService.findOne(id);
  }

  @Post()
  async create(@Body() createPolicyDto: CreatePolicyDto): Promise<any> {
    console.log(createPolicyDto);
    return this.policyService.create(createPolicyDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePolicyDto: UpdatePolicyDto,
  ): Promise<any> {
    return this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.policyService.delete(id);
  }
}
