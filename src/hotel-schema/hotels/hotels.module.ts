import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  facilities,
  facility_support_hotels,
  hotels,
} from 'models/hotelSchema';
import { address, city } from 'models/masterSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      hotels,
      address,
      facilities,
      city,
      facility_support_hotels,
    ]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
