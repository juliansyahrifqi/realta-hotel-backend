import { Module } from '@nestjs/common';
import { FacilitySupportHotelsService } from './facility-support-hotels.service';
import { FacilitySupportHotelsController } from './facility-support-hotels.controller';
import { facility_support_hotels } from 'models/hotelSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([facility_support_hotels])],
  controllers: [FacilitySupportHotelsController],
  providers: [FacilitySupportHotelsService],
})
export class FacilitySupportHotelsModule {}
