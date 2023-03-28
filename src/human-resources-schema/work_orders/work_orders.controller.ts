import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkOrdersService } from './work_orders.service';
import { CreateWorkOrderDto } from './dto/create-work_order.dto';
import { UpdateWorkOrderDto } from './dto/update-work_order.dto';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Post()
  create(@Body() createWorkOrderDto: CreateWorkOrderDto) {
    return this.workOrdersService.create(createWorkOrderDto);
  }

  @Get()
  findAll() {
    return this.workOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkOrderDto: UpdateWorkOrderDto,
  ) {
    return this.workOrdersService.update(+id, updateWorkOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workOrdersService.remove(+id);
  }
}
