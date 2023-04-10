import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { country, regions } from '../../../models/masterSchema';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';

@Module({
  imports: [SequelizeModule.forFeature([regions, country])],
  providers: [RegionsService],
  controllers: [RegionsController],
})
export class RegionsModule {}
