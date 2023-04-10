import { Body, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { department } from '../../../models/humanResourcesSchema/department';
import { Op } from 'sequelize';

@Injectable()
export class DepartmentService {
  findOne(dept_name: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(department)
    private departmentModel: typeof department,
  ) {}

  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<any> {
    try {
      const departmentToCreate = {
        ...createDepartmentDto,
        dept_modified_date: new Date(),
      };
      const result = await this.departmentModel.create(departmentToCreate);
      return {
        message: 'Departement Baru ditambahkan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(dept_name?: string): Promise<any> {
    try {
      let result;
      if (dept_name) {
        result = await this.departmentModel.findAll({
          where: { dept_name: { [Op.iLike]: `%${dept_name}%` } },
        });
        if (!result) {
          return {
            message: `Department dengan nama ${dept_name} tidak ditemukan!`,
          };
        }
        return {
          message: `Department dengan nama ${dept_name} ditemukan!`,
          data: result,
        };
      } else {
        result = await this.departmentModel.findAll();
        if (result.length === 0) {
          return {
            message: 'Data department tidak ditemukan!',
          };
        }
        return {
          message: 'Data department ditemukan!',
          data: result,
        };
      }
    } catch (error) {
      return error;
    }
  }

  // async findAll(): Promise<any> {
  //   try {
  //     const result = await this.departmentModel.findAll();
  //     if (result.length === 0) {
  //       return {
  //         message: 'Data department tidak ditemukan!',
  //       };
  //     }
  //     return {
  //       message: 'Departement ditemukan!',
  //       data: result,
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async findOne(dept_name: string) {
  //   try {
  //     const result = await this.departmentModel.findAll({
  //       where: { dept_name: { [Op.like]: `%${dept_name}%` } },
  //     });
  //     if (!result) {
  //       return {
  //         message: `Department dengan id ${dept_name} tidak ditemukan!`,
  //       };
  //     }
  //     return {
  //       message: `Department dengan department name ${dept_name} ditemukan!`,
  //       data: result,
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async update(
    dept_id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<any> {
    try {
      await this.departmentModel.update(updateDepartmentDto, {
        where: { dept_id },
      });
      const updatedDepartment = await this.departmentModel.findByPk(dept_id);
      updatedDepartment.dept_modified_date = new Date();
      await updatedDepartment.save();
      return {
        message: `Employee Department History dengan id ${dept_id} berhasil diupdate!`,
        data: updatedDepartment,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(dept_id: number): Promise<any> {
    try {
      await this.departmentModel.destroy({
        where: { dept_id },
      });
      return {
        message: `Employee Department History dengan id ${dept_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
