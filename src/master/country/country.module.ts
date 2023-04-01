import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { country } from '../../../models/masterSchema';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [SequelizeModule.forFeature([country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
