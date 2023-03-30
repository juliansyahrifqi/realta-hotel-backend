import { Module } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';
import { PurchaseOrderDetailController } from './purchase-order-detail.controller';
import { purchase_order_detail } from 'models/purchasingSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([purchase_order_detail])],
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
})
export class PurchaseOrderDetailModule {}
