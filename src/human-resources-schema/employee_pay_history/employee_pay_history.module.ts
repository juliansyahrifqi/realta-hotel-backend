import { Module } from '@nestjs/common';
import { EmployeePayHistoryService } from './employee_pay_history.service';
import { EmployeePayHistoryController } from './employee_pay_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { employee_pay_history } from '../../../models/humanResourcesSchema';
// import { EmployeePayHistoryMod }

@Module({
  imports: [SequelizeModule.forFeature([employee_pay_history])],
  controllers: [EmployeePayHistoryController],
  providers: [EmployeePayHistoryService],
})
export class EmployeePayHistoryModule {}
