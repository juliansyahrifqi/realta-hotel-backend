import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { address } from '../../../models/masterSchema';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [SequelizeModule.forFeature([address])], // import SequelizeModule dengan konfigurasi forFeature
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
