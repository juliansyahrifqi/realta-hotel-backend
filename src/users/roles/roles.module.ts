import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([roles])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
