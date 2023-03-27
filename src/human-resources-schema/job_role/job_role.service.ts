import { Injectable } from '@nestjs/common';
import { CreateJobRoleDto } from './dto/create-job_role.dto';
import { UpdateJobRoleDto } from './dto/update-job_role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { job_role } from '../../../models/humanResourcesSchema';

@Injectable()
export class JobRoleService {
  constructor(
    @InjectModel(job_role)
    private jobRoleModel: typeof job_role,
  ) {}

  async create(createJobRoleDto: CreateJobRoleDto): Promise<job_role> {
    const result = await this.jobRoleModel.create(createJobRoleDto);
    return result;
  }

  async findAll(): Promise<job_role[]> {
    const result = await this.jobRoleModel.findAll();
    return result;
  }

  async findOne(joro_id: number) {
    const result = this.jobRoleModel.findByPk(joro_id);
    return result;
  }

  async update(
    joro_id: number,
    updateJobRoleDto: UpdateJobRoleDto,
  ): Promise<any> {
    await this.jobRoleModel.update(updateJobRoleDto, {
      where: { joro_id },
    });
    return `Updated joro_id : ${joro_id} success`;
  }

  async remove(joro_id: number): Promise<any> {
    await this.jobRoleModel.destroy({
      where: { joro_id },
    });
    `deleted joro : ${joro_id} success`;
  }
}
