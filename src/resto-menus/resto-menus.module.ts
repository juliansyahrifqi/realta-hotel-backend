// resto-menus.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { resto_menus } from '../../models/restoSchema';
import { RestoMenusController } from './resto-menus.controller';
import { RestoMenusService } from './resto-menus.service';

@Module({
  imports: [SequelizeModule.forFeature([resto_menus])],
  controllers: [RestoMenusController],
  providers: [RestoMenusService],
})
export class RestoMenusModule {}
