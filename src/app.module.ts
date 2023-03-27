import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FacilitiesModule } from './hotel-schema/facilities/facilities.module';
import { HotelReviewsModule } from './hotel-schema/hotel-reviews/hotel-reviews.module';
import { FacilityPhotoModule } from './hotel-schema/facility-photo/facility-photo.module';
import { FacilityPriceHistoryModule } from './hotel-schema/facility-price-history/facility-price-history.module';
import { FacilitiesSupportModule } from './hotel-schema/facilities-support/facilities-support.module';
import { HotelsModule } from './hotel-schema/hotels/hotels.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    HotelsModule,
    FacilitiesModule,
    HotelReviewsModule,
    FacilityPhotoModule,
    FacilityPriceHistoryModule,
    FacilitiesSupportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
