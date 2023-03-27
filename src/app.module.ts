import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RestoMenusModule } from './resto-menus/resto-menus.module';
import { RestoMenuPhotosController } from './resto-menu-photos/resto-menu-photos.controller';
import { RestoMenuPhotosModule } from './resto-menu-photos/resto-menu-photos.module';
import { OrderMenusModule } from './order-menus/order-menus.module';
import { OrderMenuDetailModule } from './order-menu-detail/order-menu-detail.module';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    RestoMenusModule,
    RestoMenuPhotosModule,
    OrderMenusModule,
    OrderMenuDetailModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/resto',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
