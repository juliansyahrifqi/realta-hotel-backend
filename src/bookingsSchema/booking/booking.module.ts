import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { booking_order_detail, booking_order_detail_extra, booking_orders, special_offer_coupons, special_offers, user_breakfeast } from '../../../models/booking';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { user_members, users } from '../../../models/users';
import { facilities, facilities_support, facility_photos, facility_price_history, facility_support_hotels, hotel_reviews, hotels } from '../../../models/hotel-schema';
import { address, category_group, city, country, members, policy, policy_category_group, price_items, provinces, regions } from '../../../models/master';


@Module({
  imports: [SequelizeModule.forFeature([booking_orders, users, hotels, booking_order_detail, user_members, hotel_reviews, address, facilities_support, facilities, user_breakfeast, booking_order_detail_extra, special_offer_coupons, members, city, category_group, facility_photos, facility_price_history, price_items, special_offers, provinces, policy_category_group, country, policy, regions, facility_support_hotels])],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [SequelizeModule]
})
export class BookingModule { }
