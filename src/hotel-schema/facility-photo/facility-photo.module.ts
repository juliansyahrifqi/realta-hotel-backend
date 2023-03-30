import { Module } from '@nestjs/common';
import { FacilityPhotoService } from './facility-photo.service';
import { FacilityPhotoController } from './facility-photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facility_photos } from 'models/hotelSchema';

@Module({
  imports: [SequelizeModule.forFeature([facility_photos])],
  controllers: [FacilityPhotoController],
  providers: [FacilityPhotoService],
})
export class FacilityPhotoModule {}
