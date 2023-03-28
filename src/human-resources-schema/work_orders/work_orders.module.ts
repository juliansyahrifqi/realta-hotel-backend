import { Module } from '@nestjs/common';
import { WorkOrdersService } from './work_orders.service';
import { WorkOrdersController } from './work_orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { work_orders } from '../../../models/humanResourcesSchema';

@Module({
  imports: [SequelizeModule.forFeature([work_orders])],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
})
export class WorkOrdersModule {}
