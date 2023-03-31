import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './bookingsSchema/booking/booking.module';
import { HotelModule } from './hotelsSchema/hotel/hotel.module';

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
    BookingModule,
    HotelModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
