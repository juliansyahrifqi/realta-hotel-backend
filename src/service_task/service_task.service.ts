// service-task.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { service_task } from '../../models/master_module';
import { CreateServiceTaskDto } from './dto/create-service_task.dto';
import { UpdateServiceTaskDto } from './dto/update-service_task.dto';

@Injectable()
export class ServiceTaskService {
  constructor(
    @InjectModel(service_task)
    private serviceTaskModel: typeof service_task,
  ) {}

  async findAll(): Promise<any> {
    return await this.serviceTaskModel.findAll();
  }

  async findOne(id: number): Promise<any> {
    return await this.serviceTaskModel.findByPk(id);
  }

  async create(createServiceTaskDto: CreateServiceTaskDto): Promise<any> {
    return await this.serviceTaskModel.create(createServiceTaskDto);
  }

  async update(
    id: number,
    updateServiceTaskDto: UpdateServiceTaskDto,
  ): Promise<any> {
    const serviceTask = await this.serviceTaskModel.findByPk(id);
    serviceTask.update(updateServiceTaskDto);
    return serviceTask;
  }

  async remove(id: number): Promise<any> {
    const serviceTask = await this.serviceTaskModel.findByPk(id);
    serviceTask.destroy();
  }
}
