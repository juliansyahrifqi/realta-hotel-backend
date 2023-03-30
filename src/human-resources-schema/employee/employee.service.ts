import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { employee } from '../../../models/humanResourcesSchema';
import { join } from 'path';
import * as fs from 'fs';
import { users } from '../../../models/usersSchema/users';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(employee)
    private employeeModel: typeof employee,
  ) {}

  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const result = await this.employeeModel.create({
        emp_national_id: createEmployeeDto.emp_national_id,
        emp_birth_date: createEmployeeDto.emp_birth_date,
        emp_marital_status: createEmployeeDto.emp_marital_status,
        emp_gender: createEmployeeDto.emp_gender,
        emp_hire_date: createEmployeeDto.emp_hire_date,
        emp_salaried_flag: createEmployeeDto.emp_salaried_flag,
        emp_vacation_hours: createEmployeeDto.emp_vacation_hours,
        emp_sickleave_hours: createEmployeeDto.emp_sickleave_hours,
        emp_current_flag: createEmployeeDto.emp_current_flag,
        emp_photo: image.filename,
        emp_modified_date: createEmployeeDto.emp_modified_date,
      });

      result.emp_photo = `http://localhost:${process.env.PORT}/employee/upload/${result.emp_photo}`;

      await result.save();

      return { message: 'Data employee telah ditambahkan!', data: result };
    } catch (error) {
      return error;
    }
  }

  async employeePage(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await this.employeeModel.findAndCountAll({
        attributes: [
          'emp_id',
          'emp_national_id',
          'emp_birth_date',
          'emp_hire_date',
          'emp_current_flag',
        ],
        include: [
          {
            model: users,
            attributes: ['user_full_name'],
          },
        ],
        limit: limit,
        offset: offset,
      });
      const totalData = result.count;
      const totalPages = Math.ceil(totalData / limit);
      const currentPage = page;

      if (totalData === 0) {
        return {
          message: 'Data karyawan tidak ditemukan!',
        };
      }

      return {
        message: 'Karyawan ditemukan!',
        data: result.rows,
        meta: {
          total_data: totalData,
          total_pages: totalPages,
          current_page: currentPage,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await this.employeeModel.findAndCountAll({
        offset,
        limit,
      });
      if (!result) {
        return {
          message: 'Data karyawan tidak ditemukan!',
        };
      }
      const totalItems = result.count;
      const totalPages = Math.ceil(totalItems / limit);
      const currentPage = page;
      const nextPage = currentPage < totalPages ? currentPage + 1 : null;
      const prevPage = currentPage > 1 ? currentPage - 1 : null;
      return {
        message: 'Data karyawan telah ditemukan!',
        data: result.rows,
        pagination: {
          currentPage,
          nextPage,
          prevPage,
          totalPages,
          totalItems,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(emp_id: number): Promise<any> {
    try {
      const result = await this.employeeModel.findByPk(emp_id);
      if (!result) {
        return {
          message: `Karyawan dengan id ${emp_id} tidak ditemukan`,
        };
      }
      return {
        message: `Karyawan dengan id ${emp_id} ditemukan`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async update(
    emp_id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const result = await this.employeeModel.findOne({ where: { emp_id } });
      const imageUrl = result.emp_photo;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../../assetEmployeeImages',
        imagefilename,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await this.employeeModel.update(
        {
          emp_national_id: updateEmployeeDto.emp_national_id,
          emp_birth_date: updateEmployeeDto.emp_birth_date,
          emp_marital_status: updateEmployeeDto.emp_marital_status,
          emp_gender: updateEmployeeDto.emp_gender,
          emp_hire_date: updateEmployeeDto.emp_hire_date,
          emp_salaried_flag: updateEmployeeDto.emp_salaried_flag,
          emp_vacation_hours: updateEmployeeDto.emp_vacation_hours,
          emp_sickleave_hours: updateEmployeeDto.emp_sickleave_hours,
          emp_current_flag: updateEmployeeDto.emp_current_flag,
          emp_photo: `http://localhost:${process.env.PORT}/employee/upload/${image.filename}`,
          emp_modified_date: updateEmployeeDto.emp_modified_date,
        },
        {
          where: { emp_id },
        },
      );
      return { message: 'Data employee telah diupdate!', data: result };
    } catch (error) {
      return error;
    }
  }

  async remove(emp_id: number, req: any, res: any) {
    try {
      const result = await this.employeeModel.findOne({ where: { emp_id } });
      const imageUrl = result.emp_photo;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../../assetEmployeeImages',
        imagefilename,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await this.employeeModel.destroy({ where: { emp_id: emp_id } });
      return {
        message: `Data karyawan dengan id ${emp_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
