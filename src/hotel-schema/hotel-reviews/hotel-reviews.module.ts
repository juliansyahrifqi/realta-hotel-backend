import { Module } from '@nestjs/common';
import { HotelReviewsService } from './hotel-reviews.service';
import { HotelReviewsController } from './hotel-reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { hotels, hotel_reviews } from 'models/hotelSchema';
import { users } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([hotel_reviews, users, hotels])],
  controllers: [HotelReviewsController],
  providers: [HotelReviewsService],
})
export class HotelReviewsModule {}
