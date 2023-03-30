// service-task.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { service_task } from '../../../models/masterSchema';
import { CreateServiceTaskDto } from './dto/create-service_task.dto';
import { UpdateServiceTaskDto } from './dto/update-service_task.dto';

@Injectable()
export class ServiceTaskService {
  constructor(
    @InjectModel(service_task)
    private serviceTaskModel: typeof service_task,
  ) {}

  async findAll(): Promise<any> {
    try {
      const serviceTasks = await this.serviceTaskModel.findAll();
      return { message: 'Data found', data: serviceTasks };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const serviceTask = await this.serviceTaskModel.findByPk(id);
      if (serviceTask) {
        return { message: 'Data found', data: serviceTask };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async create(createServiceTaskDto: CreateServiceTaskDto): Promise<any> {
    try {
      const newServiceTask = await this.serviceTaskModel.create(
        createServiceTaskDto,
      );
      return { message: 'Data created', data: newServiceTask };
    } catch (error) {
      return { message: 'Error creating data', error: error.message };
    }
  }

  async update(
    id: number,
    updateServiceTaskDto: UpdateServiceTaskDto,
  ): Promise<any> {
    try {
      const serviceTask = await this.serviceTaskModel.findByPk(id);
      if (serviceTask) {
        const updatedServiceTask = await serviceTask.update(
          updateServiceTaskDto,
        );
        return { message: 'Data updated', data: updatedServiceTask };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error updating data', error: error.message };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const serviceTask = await this.serviceTaskModel.findByPk(id);
      if (serviceTask) {
        await serviceTask.destroy();
        return { message: 'Data removed' };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error removing data', error: error.message };
    }
  }
}
