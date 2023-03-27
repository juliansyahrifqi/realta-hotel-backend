import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceTaskService } from './service_task.service';
import { CreateServiceTaskDto } from './dto/create-service_task.dto';
import { UpdateServiceTaskDto } from './dto/update-service_task.dto';

@Controller('service-task')
export class ServiceTaskController {
  constructor(private readonly serviceTaskService: ServiceTaskService) {}

  @Post()
  create(@Body() createServiceTaskDto: CreateServiceTaskDto) {
    return this.serviceTaskService.create(createServiceTaskDto);
  }

  @Get()
  findAll() {
    return this.serviceTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceTaskService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceTaskDto: UpdateServiceTaskDto,
  ) {
    return this.serviceTaskService.update(+id, updateServiceTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceTaskService.remove(+id);
  }
}
