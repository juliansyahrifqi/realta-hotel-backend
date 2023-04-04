import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { vendor } from 'models/purchasingSchema';
import { SequelizeModule } from '@nestjs/sequelize';
import { entity } from 'models/paymentSchema';

@Module({
  imports: [SequelizeModule.forFeature([vendor, entity])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
