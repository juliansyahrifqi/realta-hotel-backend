import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assetEmployeeImages',
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
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assetEmployeeImages',
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
