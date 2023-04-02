import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilities } from 'models/hotelSchema/facilities';
import { category_group } from 'models/masterSchema/category_group';
import { facility_photos, facility_price_history } from 'models/hotelSchema';
import { members } from 'models/masterSchema';
import { users } from 'models/usersSchema';
import { booking_order_detail, booking_order_detail_extra, booking_orders, special_offer_coupons, special_offers, user_breakfeast } from 'models/bookingSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      facilities,
      category_group,
      facility_photos,
      facility_price_history,
      members,
      users, booking_order_detail, booking_orders, special_offer_coupons, special_offers, user_breakfeast, booking_order_detail_extra
    ]),
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule { }
