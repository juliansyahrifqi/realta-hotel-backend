import { Body, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { department } from '../../../models/humanResourcesSchema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(department)
    private departmentModel: typeof department,
  ) {}

  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<department> {
    const result = await this.departmentModel.create(createDepartmentDto);
    return result;
  }

  async findAll(): Promise<department[]> {
    const result = await this.departmentModel.findAll();
    return result;
  }

  async findOne(dept_id: number) {
    const result = await this.departmentModel.findByPk(dept_id);
    return result;
  }

  async update(
    dept_id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<any> {
    await this.departmentModel.update(updateDepartmentDto, {
      where: { dept_id },
    });
    return `Updated dept_id : ${dept_id} success`;
  }

  async remove(dept_id: number): Promise<any> {
    await this.departmentModel.destroy({
      where: { dept_id },
    });
    return `Deleted dept_id : ${dept_id} success`;
  }
}
