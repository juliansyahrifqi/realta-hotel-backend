import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import * as fs from 'fs';
import { category_group } from '../../models/master_module';
import { CreateCategoryGroupDto } from './dto/create-category_group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category_group.dto';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectModel(category_group)
    private categoryGroupModel: typeof category_group,
  ) {}

  // async create(
  //   createCategoryGroupDto: CreateCategoryGroupDto,
  // ): Promise<category_group> {
  //   return this.categoryGroupModel.create(createCategoryGroupDto);
  // }
  async create(
    data: {
      cagro_name?: string;
      cagro_description?: string;
      cagro_type?: string;
      cagro_icon?: string;
      cagro_icon_url?: string;
    },
    file: Express.Multer.File,
  ): Promise<any> {
    const createdCategoryGroup = await this.categoryGroupModel.create({
      ...data,
      cagro_icon: file.filename,
      cagro_icon_url: `http://localhost:${process.env.PORT}/files/${file.filename}`,
    });

    return createdCategoryGroup;
  }

  async findAll(): Promise<category_group[]> {
    return this.categoryGroupModel.findAll();
  }

  async findOne(id: number): Promise<category_group> {
    return this.categoryGroupModel.findByPk(id);
  }

  // async update(
  //   id: number,
  //   updateCategoryGroupDto: UpdateCategoryGroupDto,
  // ): Promise<void> {
  //   await this.categoryGroupModel.update(updateCategoryGroupDto, {
  //     where: { cagro_id: id },
  //   });
  // }

  async update(
    id: number,
    data: UpdateCategoryGroupDto,
    file?: Express.Multer.File,
  ): Promise<void> {
    const categoryGroup = await this.categoryGroupModel.findByPk(id);

    if (!categoryGroup) {
      return `Data tidak ada`;
    }

    let updateData = data;

    if (file) {
      updateData = {
        ...data,
        cagro_icon: file.filename,
        cagro_icon_url: `http://localhost:${process.env.PORT}/files/${file.filename}`,
      };
    }

    await this.categoryGroupModel.update(updateData, {
      where: { cagro_id: id },
    });
  }

  async delete(id: number): Promise<void> {
    await this.categoryGroupModel.destroy({ where: { cagro_id: id } });
  }
}
