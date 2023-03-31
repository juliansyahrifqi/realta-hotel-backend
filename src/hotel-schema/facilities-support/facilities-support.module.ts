import { Module } from '@nestjs/common';
import { FacilitiesSupportService } from './facilities-support.service';
import { FacilitiesSupportController } from './facilities-support.controller';
import {
  facilities_support,
  facility_support_hotels,
  hotels,
} from 'models/hotelSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([
      facilities_support,
      hotels,
      facility_support_hotels,
    ]),
  ],
  controllers: [FacilitiesSupportController],
  providers: [FacilitiesSupportService],
})
export class FacilitiesSupportModule {}
