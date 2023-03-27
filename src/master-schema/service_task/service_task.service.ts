import { Body, Injectable } from '@nestjs/common';
import { CreateServiceTaskDto } from './dto/create-service_task.dto';
import { UpdateServiceTaskDto } from './dto/update-service_task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { service_task } from '../../../models/masterSchema';

@Injectable()
export class ServiceTaskService {
  constructor(
    @InjectModel(service_task)
    private serviceTaskModel: typeof service_task,
  ) {}

  async create(
    @Body() createServiceTaskDto: CreateServiceTaskDto,
  ): Promise<service_task> {
    const result = await this.serviceTaskModel.create(createServiceTaskDto);
    return result;
  }

  async findAll(): Promise<service_task[]> {
    const result = await this.serviceTaskModel.findAll();
    return result;
  }

  async findOne(seta_id: number) {
    const result = await this.serviceTaskModel.findByPk(seta_id);
    return result;
  }

  async update(
    seta_id: number,
    updateServiceTaskDto: UpdateServiceTaskDto,
  ): Promise<any> {
    await this.serviceTaskModel.update(updateServiceTaskDto, {
      where: { seta_id },
    });
    return `Updated seta_id ${seta_id} success`;
  }

  async remove(seta_id: number): Promise<any> {
    await this.serviceTaskModel.destroy({
      where: { seta_id },
    });
    return `Deleted a seta_id ${seta_id} success`;
  }
}
