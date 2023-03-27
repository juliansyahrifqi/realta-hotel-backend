import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users-schema/users/users.module';
import { JobRoleModule } from './human-resources-schema/job_role/job_role.module';
import { ShiftModule } from './human-resources-schema/shift/shift.module';
import { ServiceTaskModule } from './master-schema/service_task/service_task.module';
import { FacilitesModule } from './hotel-schema/facilites/facilites.module';
import { DepartmentModule } from './human-resources-schema/department/department.module';
import { EmployeeModule } from './human-resources-schema/employee/employee.module';

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
    UsersModule,
    JobRoleModule,
    ShiftModule,
    ServiceTaskModule,
    FacilitesModule,
    DepartmentModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
