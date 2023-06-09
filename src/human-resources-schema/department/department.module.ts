import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { department } from 'models/humanResourcesSchema';
import { department } from '../../../models/humanResourcesSchema/department';

@Module({
  imports: [SequelizeModule.forFeature([department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
