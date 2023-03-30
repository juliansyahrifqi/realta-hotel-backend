import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { city } from '../../models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([city])],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
