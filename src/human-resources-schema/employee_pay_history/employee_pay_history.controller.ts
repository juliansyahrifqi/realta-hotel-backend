import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeePayHistoryService } from './employee_pay_history.service';
import { CreateEmployeePayHistoryDto } from './dto/create-employee_pay_history.dto';
import { UpdateEmployeePayHistoryDto } from './dto/update-employee_pay_history.dto';

@Controller('hr/employee-pay-history')
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

  @Put(':id')
  update(
    @Param('id') ephi_emp_id: number,
    @Body() updateEmployeePayHistoryDto: UpdateEmployeePayHistoryDto,
  ) {
    return this.employeePayHistoryService.update(
      ephi_emp_id,
      updateEmployeePayHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') ephi_emp_id: number) {
    return this.employeePayHistoryService.remove(ephi_emp_id);
  }
}
