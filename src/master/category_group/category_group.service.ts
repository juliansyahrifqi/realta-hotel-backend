import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import * as fs from 'fs';
import { category_group } from '../../../models/masterSchema';
import { CreateCategoryGroupDto } from './dto/create-category_group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category_group.dto';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectModel(category_group)
    private categoryGroupModel: typeof category_group,
  ) {}

  async create(
    @Body() createCategoryGroupDto: CreateCategoryGroupDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      const imagePath = join('./uploads/image/master', image.filename);
      if (!fs.existsSync(imagePath)) {
        throw new Error('File not found');
      }

      const produk = await this.categoryGroupModel.create({
        cagro_name: createCategoryGroupDto.cagro_name,
        cagro_description: createCategoryGroupDto.cagro_description,
        cagro_type: createCategoryGroupDto.cagro_type,
        cagro_icon: image.filename,
        cagro_icon_url: image.filename,
      });
      await produk.save();
      return { message: 'Data created', data: produk };
    } catch (error) {
      return { message: 'Failed to create data', error: error };
    }
  }

  async findAll(): Promise<any> {
    try {
      const data = await this.categoryGroupModel.findAll();
      return { message: 'Data found', data };
    } catch (error) {
      return { message: 'Data not found', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const data = await this.categoryGroupModel.findByPk(id);
      if (!data) {
        throw new Error('Data not found');
      }
      return { message: 'Data found', data };
    } catch (error) {
      return { message: 'Data not found', error: error.message };
    }
  }

  async update(
    cagro_id: string,
    @Body() updateCategoryGroupDto: UpdateCategoryGroupDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    try {
      const result = await this.categoryGroupModel.findOne({
        where: { cagro_id },
      });
      console.log(result);
      const imageUrl = result.cagro_icon;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../uploads/image/master',
        imagefilename,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await this.categoryGroupModel.update(
        {
          cagro_name: updateCategoryGroupDto.cagro_name,
          cagro_description: updateCategoryGroupDto.cagro_description,
          cagro_type: updateCategoryGroupDto.cagro_type,
          cagro_icon: image.filename,
          cagro_icon_url: image.filename,
        },
        { where: { cagro_id } },
      );
      return { message: 'Data updated' };
    } catch (error) {
      return { message: 'Failed to update data', error: error.message };
    }
  }

  async remove(cagro_id: number): Promise<any> {
    try {
      const result = await this.categoryGroupModel.findOne({
        where: { cagro_id },
      });
      console.log(result);
      const imageUrl = result.cagro_icon;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../uploads/image/master',
        imagefilename,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await this.categoryGroupModel.destroy({ where: { cagro_id } });
      return { message: 'Data deleted' };
    } catch (error) {
      return { message: 'Failed to delete data', error: error.message };
    }
  }
}
