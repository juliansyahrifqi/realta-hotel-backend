import { Module } from '@nestjs/common';
import { PurchaseOrderHeaderService } from './purchase-order-header.service';
import { PurchaseOrderHeaderController } from './purchase-order-header.controller';
import { purchase_order_header } from 'models/purchasingSchema';
import { SequelizeModule } from '@nestjs/sequelize';
import { employee } from 'models/humanResourceSchema';

@Module({
  imports: [SequelizeModule.forFeature([purchase_order_header, employee])],
  controllers: [PurchaseOrderHeaderController],
  providers: [PurchaseOrderHeaderService],
})
export class PurchaseOrderHeaderModule {}
