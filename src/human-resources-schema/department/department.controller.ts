import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('hr/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async findAll(@Query('search') dept_name?: string) {
    const result = await this.departmentService.findAll(dept_name);
    if ('error' in result) {
      throw new InternalServerErrorException('Terjadi kesalahan pada server');
    } else {
      return result;
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
