import { Module } from '@nestjs/common';
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { FacilityPriceHistoryController } from './facility-price-history.controller';
import { facilities, facility_price_history } from 'models/hotelSchema';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models/usersSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([facility_price_history, facilities, users]),
  ],
  controllers: [FacilityPriceHistoryController],
  providers: [FacilityPriceHistoryService],
})
export class FacilityPriceHistoryModule {}
