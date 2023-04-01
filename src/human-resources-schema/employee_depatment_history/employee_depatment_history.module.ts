import { Module } from '@nestjs/common';
import { EmployeeDepatmentHistoryService } from './employee_depatment_history.service';
import { EmployeeDepatmentHistoryController } from './employee_depatment_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { employee_department_history } from '../../../models/humanResourcesSchema';

@Module({
  imports: [SequelizeModule.forFeature([employee_department_history])],
  controllers: [EmployeeDepatmentHistoryController],
  providers: [EmployeeDepatmentHistoryService],
})
export class EmployeeDepatmentHistoryModule {}
