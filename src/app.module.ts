import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorModule } from './purchasing-schema/vendor/vendor.module';
import { VendorProductModule } from './purchasing-schema/vendor-product/vendor-product.module';
import { StocksModule } from './purchasing-schema/stocks/stocks.module';
import { StockPhotoModule } from './purchasing-schema/stock-photo/stock-photo.module';
import { StockDetailModule } from './purchasing-schema/stock-detail/stock-detail.module';
import { PurchaseOrderHeaderModule } from './purchasing-schema/purchase-order-header/purchase-order-header.module';
import { PurchaseOrderDetailModule } from './purchasing-schema/purchase-order-detail/purchase-order-detail.module';

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
    VendorModule,
    VendorProductModule,
    StocksModule,
    StockPhotoModule,
    StockDetailModule,
    PurchaseOrderHeaderModule,
    PurchaseOrderDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
