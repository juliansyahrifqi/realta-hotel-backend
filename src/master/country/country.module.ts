import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { country, provinces } from '../../../models/masterSchema';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [SequelizeModule.forFeature([country, provinces])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
