import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
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

  @Get('search')
  async findAllSearch(@Query('poli_name') poli_name: string) {
    try {
      const policy = await this.policyService.findAllSearch(poli_name);
      return {
        data: policy,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Internal server error',
      };
    }
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
