import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankModule } from './bank/bank.module';
import { UserAccountsModule } from './user_accounts/user_accounts.module';
import { PaymentTransactionModule } from './payment_transaction/payment_transaction.module';
import { UsersModule } from './users/users.module';
import { EntityModule } from './entity/entity.module';
import { FintechModule } from './fintech/fintech.module';
import { OrderMenusModule } from './order_menus/order_menus.module';
import { BookingOrdersModule } from './booking_orders/booking_orders.module';


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
    BankModule,
    UsersModule,
    FintechModule,
    PaymentTransactionModule,
    UserAccountsModule,
    EntityModule,
    OrderMenusModule,
    BookingOrdersModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
