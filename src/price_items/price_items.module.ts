// price-items.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceItemsService } from './price_items.service';
import { PriceItemsController } from './price_items.controller';
import { price_items } from 'models/master_module';

@Module({
  imports: [SequelizeModule.forFeature([price_items])],
  controllers: [PriceItemsController],
  providers: [PriceItemsService],
})
export class PriceItemsModule {}
