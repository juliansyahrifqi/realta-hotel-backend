import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  department,
  employee,
  employee_department_history,
  employee_pay_history,
  job_role,
  shift,
} from '../../../models/humanResourcesSchema';
import { join } from 'path';
import * as fs from 'fs';
import { users } from '../../../models/usersSchema/users';
import { Op } from 'sequelize';

@Injectable()
export class EmployeeService {
  // sequelize: any;
  constructor(
    @InjectModel(employee)
    private employeeModel: typeof employee,

    @InjectModel(employee)
    private employeePayHistoryModel: typeof employee_pay_history,

    @InjectModel(employee)
    private employeeDepartmentHistoryModel: typeof employee_department_history,

    @InjectModel(employee)
    private usersModel: typeof users,

    @InjectModel(employee)
    private departmentModel: typeof department,

    @InjectModel(employee)
    private shiftModel: typeof shift,

    @InjectModel(employee)
    private jobRoleModel: typeof job_role,
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
        emp_modified_date: new Date(),
        emp_user_id: createEmployeeDto.emp_user_id,
        emp_emp_id: createEmployeeDto.emp_emp_id,
        emp_joro_id: createEmployeeDto.emp_joro_id,
      });

      const employeePayHistory = await this.employeePayHistoryModel.create({
        ephi_emp_id: result.emp_id,
      });

      const employeeDepartmentHistory =
        await this.employeeDepartmentHistoryModel.create({
          edhi_emp_id: result.emp_id,
        });

      const users = await this.usersModel.create({
        user_id: result.emp_id,
      });

      const department = await this.departmentModel.create({
        dept_id: result.emp_id,
      });

      const jobRole = await this.jobRoleModel.create({
        joro_id: result.emp_id,
      });

      result.emp_photo = `http://localhost:${process.env.PORT}/uploads/image/hr/${result.emp_photo}`;

      await result.save();

      return { message: 'Data employee telah ditambahkan!', data: result };
    } catch (error) {
      return error;
    }
  }
  async findAll(
    page: number,
    limit: number,
    user_full_name?: string,
    emp_current_flag?: string,
  ): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const whereClause: any = {};

      if (user_full_name) {
        whereClause.user_full_name = { [Op.iLike]: `%${user_full_name}%` };
      }

      if (emp_current_flag) {
        whereClause.emp_current_flag = emp_current_flag;
      }

      const result = await this.employeeModel.findAll({
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
            where: whereClause,
            required: user_full_name ? true : false,
          },
          {
            model: employee_department_history,
            attributes: ['edhi_start_date', 'edhi_end_date'],
          },
          {
            model: employee_pay_history,
            attributes: ['ephi_rate_salary', 'ephi_pay_frequence'],
          },
        ],
        limit: limit,
        offset: offset,
      });
      const totalData = await this.employeeModel.count({
        include: [
          {
            model: users,
            attributes: ['user_full_name'],
            where: whereClause,
            required: user_full_name ? true : false,
          },
        ],
      });
      const totalPages = Math.ceil(totalData / limit);
      const currentPage = page;

      if (!result) {
        return {
          message: 'Data karyawan tidak ditemukan!',
        };
      }

      return {
        message: 'Karyawan ditemukan!',
        data: result,
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

  // async findAll(
  //   page: number,
  //   limit: number,
  //   user_full_name?: string,
  // ): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;
  //     const whereClause = user_full_name
  //       ? { user_full_name: { [Op.like]: `%${user_full_name}%` } }
  //       : {};
  //     const result = await this.employeeModel.findAll({
  //       attributes: [
  //         'emp_id',
  //         'emp_national_id',
  //         'emp_birth_date',
  //         'emp_hire_date',
  //         'emp_current_flag',
  //       ],
  //       include: [
  //         {
  //           model: users,
  //           attributes: ['user_full_name'],
  //           where: whereClause,
  //           required: user_full_name ? true : false,
  //         },
  //       ],
  //       limit: limit,
  //       offset: offset,
  //     });
  //     const totalData = await this.employeeModel.count({
  //       include: [
  //         {
  //           model: users,
  //           attributes: ['user_full_name'],
  //           where: whereClause,
  //           required: user_full_name ? true : false,
  //         },
  //       ],
  //     });
  //     const totalPages = Math.ceil(totalData / limit);
  //     const currentPage = page;

  //     if (!result) {
  //       return {
  //         message: 'Data karyawan tidak ditemukan!',
  //       };
  //     }

  //     return {
  //       message: 'Karyawan ditemukan!',
  //       data: result,
  //       meta: {
  //         total_data: totalData,
  //         total_pages: totalPages,
  //         current_page: currentPage,
  //       },
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

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
        '../../../../uploads/image/hr',
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
          emp_photo: `http://localhost:${process.env.PORT}/uploads/image/hr/${image.filename}`,
          emp_modified_date: new Date(),
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
        '../../../../uploads/image/hr',
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
