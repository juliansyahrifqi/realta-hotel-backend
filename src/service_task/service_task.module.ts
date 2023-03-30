// service-task.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { service_task } from '../../models/masterSchema';
import { ServiceTaskController } from './service_task.controller';
import { ServiceTaskService } from './service_task.service';

@Module({
  imports: [SequelizeModule.forFeature([service_task])],
  controllers: [ServiceTaskController],
  providers: [ServiceTaskService],
})
export class ServiceTaskModule {}
