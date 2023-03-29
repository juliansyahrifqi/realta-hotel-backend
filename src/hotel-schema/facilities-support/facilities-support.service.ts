import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { facilities_support, hotels } from 'models/hotelSchema';
import { CreateFacilitiesSupportDto } from './dto/create-facilities-support.dto';
import { UpdateFacilitiesSupportDto } from './dto/update-facilities-support.dto';

@Injectable()
export class FacilitiesSupportService {
  constructor(
    @InjectModel(facilities_support)
    private faciSupModel: typeof facilities_support,
  ) {}

  async create(createFacilitiesSupportDto: CreateFacilitiesSupportDto) {
    try {
      const data = await this.faciSupModel.create({
        fs_name: createFacilitiesSupportDto.fs_name,
        fs_description: createFacilitiesSupportDto.fs_description,
        fs_icon: createFacilitiesSupportDto.fs_icon,
        fs_icon_url: createFacilitiesSupportDto.fs_icon_url,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const data = await this.faciSupModel.findAll({
        include: [{ model: hotels }],
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    try {
      const data = this.faciSupModel.findOne({
        where: { fs_id: id },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(
    id: number,
    updateFacilitiesSupportDto: UpdateFacilitiesSupportDto,
  ) {
    try {
      const data = await this.faciSupModel.update(
        {
          fs_name: updateFacilitiesSupportDto.fs_name,
          fs_description: updateFacilitiesSupportDto.fs_description,
          fs_icon: updateFacilitiesSupportDto.fs_icon,
          fs_icon_url: updateFacilitiesSupportDto.fs_icon_url,
        },
        {
          where: { fs_id: id },
        },
      );

      return `This action updates a #${id} facilitiesSupport`;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.faciSupModel.destroy({
        where: { fs_id: id },
      });
      return `This action removes a #${id} facilitiesSupport`;
    } catch (error) {
      return error;
    }
  }
}
