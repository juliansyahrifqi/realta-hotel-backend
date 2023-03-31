import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseOrderDetailModule } from './purchasing-schema/purchase-order-detail/purchase-order-detail.module';
import { PurchaseOrderHeaderModule } from './purchasing-schema/purchase-order-header/purchase-order-header.module';
import { StockDetailModule } from './purchasing-schema/stock-detail/stock-detail.module';
import { StockPhotoModule } from './purchasing-schema/stock-photo/stock-photo.module';
import { StocksModule } from './purchasing-schema/stocks/stocks.module';
import { VendorProductModule } from './purchasing-schema/vendor-product/vendor-product.module';
import { VendorModule } from './purchasing-schema/vendor/vendor.module';
import { JwtMiddleware } from './users/auth/jwt.middleware';

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
    // HotelsModule,
    // FacilitiesModule,
    // HotelReviewsModule,
    // FacilityPhotoModule,
    // FacilityPriceHistoryModule,
    // FacilitiesSupportModule,
    // FacilitySupportHotelsModule,
    // UsersModule,
    // UserMembersModule,
    // UserBonusPointsModule,
    // RolesModule,
    // UserPasswordModule,
    // AuthModule,
    // RegionsModule,
    // AddressModule,
    // CategoryGroupModule,
    // CountryModule,
    // ProvincesModule,
    // CityModule,
    // PolicyCategoryGroupModule,
    // PolicyModule,
    // MembersModule,
    // PriceItemsModule,
    // ServiceTaskModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'users/signUpGuest', method: RequestMethod.POST },
        { path: 'users/signUpEmployee', method: RequestMethod.POST },
        'auth/(.*)',
      )
      .forRoutes('*');
  }
}
