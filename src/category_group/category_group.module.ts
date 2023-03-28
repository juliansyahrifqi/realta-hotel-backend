// category-group.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { category_group } from '../../models/master_module';
import { CategoryGroupService } from './category_group.service';
import { CategoryGroupController } from './category_group.controller';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    SequelizeModule.forFeature([category_group]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [CategoryGroupController],
  providers: [CategoryGroupService],
})
export class CategoryGroupModule {}
