import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('hr/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('emp_photo', {
      storage: diskStorage({
        destination: './uploads/image/hr',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    const result = await this.employeeService.create(createEmployeeDto, image);
    return result;
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') user_full_name: string,
    @Query('status') emp_current_flag: string,
  ) {
    return this.employeeService.findAll(
      page,
      limit,
      user_full_name,
      emp_current_flag,
    );
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('emp_photo', {
      storage: diskStorage({
        destination: './uploads/image/hr',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Param('id') id: string,
  ) {
    const result = await this.employeeService.update(
      +id,
      updateEmployeeDto,
      image,
    );
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any, @Res() res: any) {
    return this.employeeService.remove(+id, req, res);
  }
}
