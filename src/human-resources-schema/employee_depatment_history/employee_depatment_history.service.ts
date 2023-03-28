import { Body, Injectable } from '@nestjs/common';
import { CreateEmployeeDepatmentHistoryDto } from './dto/create-employee_depatment_history.dto';
import { UpdateEmployeeDepatmentHistoryDto } from './dto/update-employee_depatment_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { employee_department_history } from '../../../models/humanResourcesSchema';

@Injectable()
export class EmployeeDepatmentHistoryService {
  constructor(
    @InjectModel(employee_department_history)
    private employeeDepartmentHistoryModel: typeof employee_department_history,
  ) {}

  async create(
    @Body()
    createEmployeeDepatmentHistoryDto: CreateEmployeeDepatmentHistoryDto,
  ): Promise<employee_department_history> {
    const result = await this.employeeDepartmentHistoryModel.create(
      createEmployeeDepatmentHistoryDto,
    );
    return result;
  }

  async findAll(): Promise<employee_department_history[]> {
    const result = await this.employeeDepartmentHistoryModel.findAll();
    return result;
  }

  async findOne(edhi_id: number) {
    const result = await this.employeeDepartmentHistoryModel.findByPk(edhi_id);
    return result;
  }

  async update(
    edhi_id: number,
    updateEmployeeDepatmentHistoryDto: UpdateEmployeeDepatmentHistoryDto,
  ): Promise<any> {
    await this.employeeDepartmentHistoryModel.update(
      updateEmployeeDepatmentHistoryDto,
      {
        where: { edhi_id },
      },
    );
    return `Updated edhi_id : ${edhi_id} success`;
  }

  async remove(edhi_id: number): Promise<any> {
    await this.employeeDepartmentHistoryModel.destroy({
      where: { edhi_id },
    });
    return `Deleted edhi_id : ${edhi_id} success`;
  }
}
