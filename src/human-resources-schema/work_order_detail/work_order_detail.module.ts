import { Module } from '@nestjs/common';
import { WorkOrderDetailService } from './work_order_detail.service';
import { WorkOrderDetailController } from './work_order_detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { work_order_detail } from '../../../models/humanResourcesSchema';

@Module({
  imports: [SequelizeModule.forFeature([work_order_detail])],
  controllers: [WorkOrderDetailController],
  providers: [WorkOrderDetailService],
})
export class WorkOrderDetailModule {}
