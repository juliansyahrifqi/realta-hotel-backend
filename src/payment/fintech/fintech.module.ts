import { Module } from '@nestjs/common';
import { FintechService } from './fintech.service';
import { FintechController } from './fintech.controller';
import { entity, fintech } from 'models/paymentSchema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([fintech, entity])],
  controllers: [FintechController],
  providers: [FintechService]
})
export class FintechModule {}
