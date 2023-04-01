import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { shift } from '../../../models/humanResourcesSchema';

@Module({
  imports: [SequelizeModule.forFeature([shift])],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
