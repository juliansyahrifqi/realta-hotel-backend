import { Module } from '@nestjs/common';
import { ServiceTaskService } from './service_task.service';
import { ServiceTaskController } from './service_task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { service_task } from '../../../models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([service_task])],
  controllers: [ServiceTaskController],
  providers: [ServiceTaskService],
})
export class ServiceTaskModule {}
