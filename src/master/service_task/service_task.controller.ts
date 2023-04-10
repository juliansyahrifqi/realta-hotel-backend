// service-task.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
// import { service_task } from '../../models/master_module';
import { ServiceTaskService } from './service_task.service';
import { CreateServiceTaskDto } from './dto/create-service_task.dto';
import { UpdateServiceTaskDto } from './dto/update-service_task.dto';

@Controller('service-task')
export class ServiceTaskController {
  constructor(private serviceTaskService: ServiceTaskService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.serviceTaskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.serviceTaskService.findOne(id);
  }

  @Post()
  async create(@Body() createServiceTaskDto: any): Promise<any> {
    return this.serviceTaskService.create(createServiceTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServiceTaskDto: any,
  ): Promise<any> {
    return this.serviceTaskService.update(id, updateServiceTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.serviceTaskService.remove(id);
  }
}
