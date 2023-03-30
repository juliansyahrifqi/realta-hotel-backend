import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilities } from 'models/hotelSchema/facilities';
import { category_group } from 'models/masterSchema/category_group';
import { facility_photos, facility_price_history } from 'models/hotelSchema';
import { members } from 'models/masterSchema';
import { users } from 'models/usersSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      facilities,
      category_group,
      facility_photos,
      facility_price_history,
      members,
      users,
    ]),
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
