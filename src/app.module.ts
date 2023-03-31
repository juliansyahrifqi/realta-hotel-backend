import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { JobRoleModule } from './human-resources-schema/job_role/job_role.module';
import { ShiftModule } from './human-resources-schema/shift/shift.module';
import { DepartmentModule } from './human-resources-schema/department/department.module';
import { EmployeeModule } from './human-resources-schema/employee/employee.module';
import { EmployeeDepatmentHistoryModule } from './human-resources-schema/employee_depatment_history/employee_depatment_history.module';
import { EmployeePayHistoryModule } from './human-resources-schema/employee_pay_history/employee_pay_history.module';
import { WorkOrdersModule } from './human-resources-schema/work_orders/work_orders.module';
import { WorkOrderDetailModule } from './human-resources-schema/work_order_detail/work_order_detail.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    JobRoleModule,
    ShiftModule,
    DepartmentModule,
    EmployeeModule,
    EmployeeDepatmentHistoryModule,
    EmployeePayHistoryModule,
    WorkOrdersModule,
    WorkOrderDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
