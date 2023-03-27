import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilities, hotels } from 'models/hotelSchema';
import { address, city } from 'models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([hotels, address, facilities, city])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
