import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EmployeeDepatmentHistoryService } from './employee_depatment_history.service';
import { CreateEmployeeDepatmentHistoryDto } from './dto/create-employee_depatment_history.dto';
import { UpdateEmployeeDepatmentHistoryDto } from './dto/update-employee_depatment_history.dto';

@Controller('employee-depatment-history')
export class EmployeeDepatmentHistoryController {
  constructor(
    private readonly employeeDepatmentHistoryService: EmployeeDepatmentHistoryService,
  ) {}

  @Post()
  create(
    @Body()
    createEmployeeDepatmentHistoryDto: CreateEmployeeDepatmentHistoryDto,
  ) {
    return this.employeeDepatmentHistoryService.create(
      createEmployeeDepatmentHistoryDto,
    );
  }

  @Get()
  findAll() {
    return this.employeeDepatmentHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDepatmentHistoryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateEmployeeDepatmentHistoryDto: UpdateEmployeeDepatmentHistoryDto,
  ) {
    return this.employeeDepatmentHistoryService.update(
      +id,
      updateEmployeeDepatmentHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDepatmentHistoryService.remove(+id);
  }
}
