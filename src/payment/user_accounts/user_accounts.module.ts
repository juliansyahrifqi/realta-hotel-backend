import { Module } from '@nestjs/common';
import { UserAccountsService } from './user_accounts.service';
import { UserAccountsController } from './user_accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { user_accounts } from 'models/paymentSchema';

@Module({
  imports: [SequelizeModule.forFeature([user_accounts])],
  controllers: [UserAccountsController],
  providers: [UserAccountsService]
})
export class UserAccountsModule {}
