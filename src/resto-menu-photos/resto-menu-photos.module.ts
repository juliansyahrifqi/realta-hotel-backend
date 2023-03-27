import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RestoMenuPhotosService } from './resto-menu-photos.service';
import { RestoMenuPhotosController } from './resto-menu-photos.controller';
import { resto_menu_photos } from '../../models/resto_module';

@Module({
  imports: [SequelizeModule.forFeature([resto_menu_photos])],
  providers: [RestoMenuPhotosService],
  controllers: [RestoMenuPhotosController],
})
export class RestoMenuPhotosModule {}
