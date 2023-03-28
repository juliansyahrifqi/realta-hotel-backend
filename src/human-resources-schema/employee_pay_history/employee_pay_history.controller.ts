import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeePayHistoryService } from './employee_pay_history.service';
import { CreateEmployeePayHistoryDto } from './dto/create-employee_pay_history.dto';
import { UpdateEmployeePayHistoryDto } from './dto/update-employee_pay_history.dto';

@Controller('employee-pay-history')
export class EmployeePayHistoryController {
  constructor(
    private readonly employeePayHistoryService: EmployeePayHistoryService,
  ) {}

  @Post()
  create(@Body() createEmployeePayHistoryDto: CreateEmployeePayHistoryDto) {
    return this.employeePayHistoryService.create(createEmployeePayHistoryDto);
  }

  @Get()
  findAll() {
    return this.employeePayHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePayHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeePayHistoryDto: UpdateEmployeePayHistoryDto,
  ) {
    return this.employeePayHistoryService.update(
      +id,
      updateEmployeePayHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePayHistoryService.remove(+id);
  }
}
