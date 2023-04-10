import { Module } from '@nestjs/common';
import { VendorProductService } from './vendor-product.service';
import { VendorProductController } from './vendor-product.controller';
import { vendor_product } from 'models/purchasingSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([vendor_product])],
  controllers: [VendorProductController],
  providers: [VendorProductService],
})
export class VendorProductModule {}
