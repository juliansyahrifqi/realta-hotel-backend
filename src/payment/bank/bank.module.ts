import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { bank, entity, fintech, payment_transaction, user_accounts } from '../../../models/paymentSchema';
import { users } from '../../../models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([bank, entity])],
  controllers: [BankController],
  providers: [BankService],
  exports: [SequelizeModule]
})
export class BankModule {}
