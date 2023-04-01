import { Module } from '@nestjs/common';
import { JobRoleService } from './job_role.service';
import { JobRoleController } from './job_role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { job_role } from '../../../models/humanResourcesSchema';

@Module({
  imports: [SequelizeModule.forFeature([job_role])],
  controllers: [JobRoleController],
  providers: [JobRoleService],
})
export class JobRoleModule {}
