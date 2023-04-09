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
  ): Promise<any> {
    try {
      const result = await this.employeeDepartmentHistoryModel.create(
        createEmployeeDepatmentHistoryDto,
      );
      return {
        message: 'Employee Departement History Baru ditambahkan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.employeeDepartmentHistoryModel.findAll();
      if (result.length === 0) {
        return {
          message: 'Data Employee Departement History tidak ditemukan!',
        };
      }
      return {
        message: 'Data Employee Departement History ditemukan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(edhi_id: number) {
    try {
      const result = await this.employeeDepartmentHistoryModel.findByPk(
        edhi_id,
      );
      if (!result) {
        return {
          message: `Employee Department History dengan id ${edhi_id} tidak ditemukan!`,
        };
      }
      return {
        message: `Employee Department History dengan id ${edhi_id} ditemukan!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async update(
    edhi_id: number,
    updateEmployeeDepatmentHistoryDto: UpdateEmployeeDepatmentHistoryDto,
  ): Promise<any> {
    try {
      const result = await this.employeeDepartmentHistoryModel.update(
        updateEmployeeDepatmentHistoryDto,
        {
          where: { edhi_id },
        },
      );
      return {
        message: `Employee Department History dengan id ${edhi_id} berhasil diupdate!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(edhi_id: number): Promise<any> {
    try {
      await this.employeeDepartmentHistoryModel.destroy({
        where: { edhi_id },
      });
      return {
        message: `Employee Department History dengan id ${edhi_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
