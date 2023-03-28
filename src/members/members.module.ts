import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { members } from '../../models/master_module';

@Module({
  imports: [SequelizeModule.forFeature([members])],
  providers: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
