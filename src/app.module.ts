import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './bookingsSchema/booking/booking.module';
import { RestoMenusModule } from './resto/resto-menus/resto-menus.module';
import { RestoMenuPhotosModule } from './resto/resto-menu-photos/resto-menu-photos.module';
import { OrderMenusModule } from './resto/order-menus/order-menus.module';
import { OrderMenuDetailModule } from './resto/order-menu-detail/order-menu-detail.module';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { FacilitiesModule } from './hotel-schema/facilities/facilities.module';
import { HotelReviewsModule } from './hotel-schema/hotel-reviews/hotel-reviews.module';
import { FacilityPhotoModule } from './hotel-schema/facility-photo/facility-photo.module';
import { FacilityPriceHistoryModule } from './hotel-schema/facility-price-history/facility-price-history.module';
import { FacilitiesSupportModule } from './hotel-schema/facilities-support/facilities-support.module';
import { HotelsModule } from './hotel-schema/hotels/hotels.module';
import { FacilitySupportHotelsModule } from './hotel-schema/facility-support-hotels/facility-support-hotels.module';
import { UsersModule } from './users/users/users.module';
import { UserMembersModule } from './users/user-members/user-members.module';
import { UserBonusPointsModule } from './users/user-bonus-points/user-bonus-points.module';
import { RolesModule } from './users/roles/roles.module';
import { UserPasswordModule } from './users/user-password/user-password.module';
import { AuthModule } from './users/auth/auth.module';
import { JwtMiddleware } from './users/auth/jwt.middleware';
import { RegionsModule } from './master/regions/regions.module';
import { AddressModule } from './master/address/address.module';
import { CategoryGroupModule } from './master/category_group/category_group.module';
import { CountryModule } from './master/country/country.module';
import { ProvincesModule } from './master/provinces/provinces.module';
import { CityModule } from './master/city/city.module';
import { PolicyCategoryGroupModule } from './master/policy_category_group/policy_category_group.module';
import { PolicyModule } from './master/policy/policy.module';
import { MembersModule } from './master/members/members.module';
import { PriceItemsModule } from './master/price_items/price_items.module';
import { ServiceTaskModule } from './master/service_task/service_task.module';

import { JobRoleModule } from './human-resources-schema/job_role/job_role.module';
import { ShiftModule } from './human-resources-schema/shift/shift.module';
import { DepartmentModule } from './human-resources-schema/department/department.module';
import { EmployeeModule } from './human-resources-schema/employee/employee.module';
import { EmployeeDepatmentHistoryModule } from './human-resources-schema/employee_depatment_history/employee_depatment_history.module';
import { EmployeePayHistoryModule } from './human-resources-schema/employee_pay_history/employee_pay_history.module';
import { WorkOrdersModule } from './human-resources-schema/work_orders/work_orders.module';
import { WorkOrderDetailModule } from './human-resources-schema/work_order_detail/work_order_detail.module';
import { PurchaseOrderDetailModule } from './purchasing-schema/purchase-order-detail/purchase-order-detail.module';
import { PurchaseOrderHeaderModule } from './purchasing-schema/purchase-order-header/purchase-order-header.module';
import { StockDetailModule } from './purchasing-schema/stock-detail/stock-detail.module';
import { StockPhotoModule } from './purchasing-schema/stock-photo/stock-photo.module';
import { StocksModule } from './purchasing-schema/stocks/stocks.module';
import { VendorProductModule } from './purchasing-schema/vendor-product/vendor-product.module';
import { VendorModule } from './purchasing-schema/vendor/vendor.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankModule } from '../src/payment/bank/bank.module';
import { UserAccountsModule } from '../src/payment/user_accounts/user_accounts.module';
import { PaymentTransactionModule } from '../src/payment/payment_transaction/payment_transaction.module';
import { EntityModule } from '../src/payment/entity/entity.module';
import { FintechModule } from '../src/payment/fintech/fintech.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
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
        destination: './uploads/image/resto',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
    JobRoleModule,
    ShiftModule,
    DepartmentModule,
    EmployeeModule,
    EmployeeDepatmentHistoryModule,
    EmployeePayHistoryModule,
    WorkOrdersModule,
    WorkOrderDetailModule,
    HotelsModule,
    FacilitiesModule,
    HotelReviewsModule,
    FacilityPhotoModule,
    FacilityPriceHistoryModule,
    FacilitiesSupportModule,
    FacilitySupportHotelsModule,
    UsersModule,
    UserMembersModule,
    UserBonusPointsModule,
    RolesModule,
    UserPasswordModule,
    AuthModule,
    RegionsModule,
    AddressModule,
    CategoryGroupModule,
    CountryModule,
    ProvincesModule,
    CityModule,
    PolicyCategoryGroupModule,
    PolicyModule,
    MembersModule,
    PriceItemsModule,
    ServiceTaskModule,
    BookingModule,
    VendorModule,
    VendorProductModule,
    StocksModule,
    StockPhotoModule,
    StockDetailModule,
    PurchaseOrderHeaderModule,
    PurchaseOrderDetailModule,
    BankModule,
    UsersModule,
    FintechModule,
    PaymentTransactionModule,
    UserAccountsModule,
    EntityModule,
    OrderMenusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  // consumer
  //   .apply(JwtMiddleware)
  //   .exclude(
  //     { path: 'users/signUpGuest', method: RequestMethod.POST },
  //     { path: 'users/signUpEmployee', method: RequestMethod.POST },
  //     'auth/(.*)',
  //   )
  //   .forRoutes('*');
  // }
}
// export class AppModule implements NestModule {
//   // configure(consumer: MiddlewareConsumer) {
//     // consumer
//     //   .apply(JwtMiddleware)
//     //   .exclude(
//     //     { path: 'users/signUpGuest', method: RequestMethod.POST },
//     //     { path: 'users/signUpEmployee', method: RequestMethod.POST },
//     //     'auth/(.*)',
//     //   )
//     //   .forRoutes('*');
//   // }
// }
