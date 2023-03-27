import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { employee } from '../../../models/humanResourcesSchema';
import { join } from 'path';
import * as fs from 'fs';

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
    const employee = await this.employeeModel.create({
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
    employee.emp_photo = `http://localhost:${process.env.PORT}/employee/upload/${employee.emp_photo}`;
    await employee.save();
    return employee;
  }

  async findAll(): Promise<employee[]> {
    const result = await this.employeeModel.findAll();
    return result;
  }

  async findOne(emp_id: number): Promise<any> {
    const result = await this.employeeModel.findByPk(emp_id);
    return result;
  }

  async update(
    emp_id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const result = await this.employeeModel.findOne({ where: { emp_id } });
    const imageUrl = result.emp_photo;
    const imagefilename = imageUrl.split('/').pop();
    const imagePath = join(
      __dirname,
      '../../../assetEmployeeImages',
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
    return `Updated dept_id : ${emp_id} success`;
  }

  async remove(emp_id: number, req: any, res: any) {
    try {
      const empRemove = await this.employeeModel.findOne({
        where: {
          emp_id: emp_id,
        },
      });
      if (!empRemove) {
        return res.status(404).json({ msg: 'Employee not Found' });
      }

      const result = await this.employeeModel.findOne({ where: { emp_id } });
      const imageUrl = result.emp_photo;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../assetEmployeeImages',
        imagefilename,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await this.employeeModel.destroy({ where: { emp_id: emp_id } });
      res.status(200).json({ msg: 'Employee deleted' });
    } catch (err) {
      return err;
    }
  }
}
