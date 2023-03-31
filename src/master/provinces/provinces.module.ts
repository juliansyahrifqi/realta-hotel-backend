import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { provinces } from '../../../models/masterSchema';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';

@Module({
  imports: [SequelizeModule.forFeature([provinces])],
  controllers: [ProvincesController],
  providers: [ProvincesService],
})
export class ProvincesModule {}
