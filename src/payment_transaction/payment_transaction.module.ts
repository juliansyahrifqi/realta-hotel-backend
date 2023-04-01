import { Module } from '@nestjs/common';
import { PaymentTransactionService } from './payment_transaction.service';
import { PaymentTransactionController } from './payment_transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { payment_transaction, user_accounts } from 'models/paymentSchema';
import { booking_orders } from 'models/bookingSchema';
import { order_menus } from 'models/restoSchema';

@Module({
  imports: [SequelizeModule.forFeature([payment_transaction, user_accounts, booking_orders, order_menus])],
  controllers: [PaymentTransactionController],
  providers: [PaymentTransactionService]
})
export class PaymentTransactionModule {}
