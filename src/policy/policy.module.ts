import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PolicyController } from './policy.controller';
import { policy } from '../../models/masterSchema';
import { PolicyService } from './policy.service';

@Module({
  imports: [SequelizeModule.forFeature([policy])],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
