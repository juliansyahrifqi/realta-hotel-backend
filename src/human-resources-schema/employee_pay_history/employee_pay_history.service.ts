import { Body, Injectable } from '@nestjs/common';
import { CreateEmployeePayHistoryDto } from './dto/create-employee_pay_history.dto';
import { UpdateEmployeePayHistoryDto } from './dto/update-employee_pay_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { employee_pay_history } from '../../../models/humanResourcesSchema';

@Injectable()
export class EmployeePayHistoryService {
  constructor(
    @InjectModel(employee_pay_history)
    private employeePayHistoryModel: typeof employee_pay_history,
  ) {}

  async create(
    @Body() createEmployeePayHistoryDto: CreateEmployeePayHistoryDto,
  ): Promise<employee_pay_history> {
    const result = await this.employeePayHistoryModel.create(
      createEmployeePayHistoryDto,
    );
    return result;
  }

  async findAll(): Promise<employee_pay_history[]> {
    const result = await this.employeePayHistoryModel.findAll();
    return result;
  }

  async findOne(ephi_rate_change_date: number) {
    const result = await this.employeePayHistoryModel.findByPk(
      ephi_rate_change_date,
    );
    return result;
  }

  async update(
    ephi_rate_change_date: number,
    updateEmployeePayHistoryDto: UpdateEmployeePayHistoryDto,
  ): Promise<any> {
    await this.employeePayHistoryModel.update(updateEmployeePayHistoryDto, {
      where: { ephi_rate_change_date },
    });
    return `Updated ephi_rate_change_date : ${ephi_rate_change_date} success`;
  }

  async remove(ephi_rate_change_date: number): Promise<any> {
    await this.employeePayHistoryModel.destroy({
      where: { ephi_rate_change_date },
    });
    return `Deleted ephi_rate_change_date : ${ephi_rate_change_date} success`;
  }
}
