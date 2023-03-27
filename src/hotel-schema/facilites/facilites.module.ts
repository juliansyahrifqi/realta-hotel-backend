import { Module } from '@nestjs/common';
import { FacilitesService } from './facilites.service';
import { FacilitesController } from './facilites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilites } from '../../../models/hotelSchema';

@Module({
  imports: [SequelizeModule.forFeature([facilites])],
  controllers: [FacilitesController],
  providers: [FacilitesService],
})
export class FacilitesModule {}
