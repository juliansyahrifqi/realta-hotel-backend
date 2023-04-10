import { Body, Injectable } from '@nestjs/common';
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

  async create(@Body() createJobRoleDto: CreateJobRoleDto): Promise<any> {
    try {
      const jobRoletoCreate = {
        ...createJobRoleDto,
        joro_modified_date: new Date(),
      };
      const result = await this.jobRoleModel.create(jobRoletoCreate);
      return {
        message: 'Job Role Baru ditambahkan!',
        data: result,
      };
    } catch (error) {}
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.jobRoleModel.findAll();
      if (result.length === 0) {
        return {
          message: 'Job Role tidak ditemukan!',
        };
      }
      return {
        message: 'Job Role ditemukan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(joro_id: number) {
    try {
      const result = await this.jobRoleModel.findByPk(joro_id);
      if (!result) {
        return {
          message: `Job Role dengan id ${joro_id} tidak ditemukan!`,
        };
      }
      return {
        message: `Job Role dengan id ${joro_id} ditemukan!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async update(
    joro_id: number,
    updateJobRoleDto: UpdateJobRoleDto,
  ): Promise<any> {
    try {
      await this.jobRoleModel.update(updateJobRoleDto, {
        where: { joro_id },
      });
      const updatedJobRole = await this.jobRoleModel.findByPk(joro_id);
      updatedJobRole.joro_modified_date = new Date();
      await updatedJobRole.save();
      return {
        message: `Job Role dengan id ${joro_id} berhasil diupdate!`,
        data: updatedJobRole,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(joro_id: number): Promise<any> {
    try {
      await this.jobRoleModel.destroy({
        where: { joro_id },
      });
      return {
        message: `Job Role dengan id ${joro_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
