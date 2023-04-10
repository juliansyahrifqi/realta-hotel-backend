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
  ): Promise<any> {
    try {
      const payHistoryToCreate = {
        ...createEmployeePayHistoryDto,
        ephi_modified_date: new Date(),
      };
      const result = await this.employeePayHistoryModel.create(
        payHistoryToCreate,
      );
      return {
        message: 'Employee Pay History Baru ditambahkan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.employeePayHistoryModel.findAll();
      if (result.length === 0) {
        return {
          message: 'Data Employee Pay History tidak ditemukan!',
        };
      }
      return {
        message: 'Data Employee Pay History ditemukan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(ephi_emp_id: number) {
    try {
      const result = await this.employeePayHistoryModel.findByPk(ephi_emp_id);
      if (!result) {
        return {
          message: `Employee Department History dengan id ${ephi_emp_id} tidak ditemukan!`,
        };
      }
      return {
        message: `Employee Department History dengan id ${ephi_emp_id} ditemukan!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async update(
    ephi_emp_id: number,
    updateEmployeePayHistoryDto: UpdateEmployeePayHistoryDto,
  ): Promise<any> {
    try {
      await this.employeePayHistoryModel.update(updateEmployeePayHistoryDto, {
        where: { ephi_emp_id },
      });
      const updatedPayHistory = await this.employeePayHistoryModel.findByPk(
        ephi_emp_id,
      );
      updatedPayHistory.ephi_modified_date = new Date();
      await updatedPayHistory.save();
      return {
        message: `Employee Department History dengan id ${ephi_emp_id} berhasil diupdate!`,
        data: updatedPayHistory,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(ephi_emp_id: number): Promise<any> {
    try {
      const result = await this.employeePayHistoryModel.destroy({
        where: { ephi_emp_id },
      });
      return {
        message: `Employee Pay History dengan id ${ephi_emp_id} berhasil dihapus!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }
}
