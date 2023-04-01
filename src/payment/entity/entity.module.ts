import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { entity } from 'models/paymentSchema';

@Module({
  imports: [SequelizeModule.forFeature([entity])],
  controllers: [EntityController],
  providers: [EntityService]
})
export class EntityModule {}
