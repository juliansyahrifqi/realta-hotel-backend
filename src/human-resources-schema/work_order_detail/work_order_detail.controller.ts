import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WorkOrderDetailService } from './work_order_detail.service';
import { CreateWorkOrderDetailDto } from './dto/create-work_order_detail.dto';
import { UpdateWorkOrderDetailDto } from './dto/update-work_order_detail.dto';

@Controller('work-order-detail')
export class WorkOrderDetailController {
  constructor(
    private readonly workOrderDetailService: WorkOrderDetailService,
  ) {}

  @Post()
  create(@Body() createWorkOrderDetailDto: CreateWorkOrderDetailDto) {
    return this.workOrderDetailService.create(createWorkOrderDetailDto);
  }

  @Get('wodeDetail')
  employeePage() {
    return this.workOrderDetailService.wodeDetail();
  }

  @Get()
  findAll() {
    return this.workOrderDetailService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkOrderDetailDto: UpdateWorkOrderDetailDto,
  ) {
    return this.workOrderDetailService.update(+id, updateWorkOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workOrderDetailService.remove(+id);
  }
}
