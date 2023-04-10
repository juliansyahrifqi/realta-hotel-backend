import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import {
  department,
  employee,
  employee_department_history,
  employee_pay_history,
  job_role,
} from '../../../models/humanResourcesSchema'; // ini nambah
import { users } from 'models/usersSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      employee,
      employee_pay_history,
      employee_department_history,
      department,
      users,
      job_role,
    ]), // ini nambah juga
    MulterModule.register({
      dest: './assetEmployeeImages',
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
