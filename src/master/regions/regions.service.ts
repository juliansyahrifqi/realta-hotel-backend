import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { regions, country } from '../../../models/masterSchema';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(regions)
    private readonly regionsModel: typeof regions,
    @InjectModel(country)
    private readonly countryModel: typeof country,
  ) {}

  async findAll(): Promise<any> {
    try {
      const region = await this.regionsModel.findAll({
        order: ['region_code'],
      });
      return { message: 'Data found', data: region };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const region = await this.regionsModel.findByPk(id);
      if (region) {
        return { message: 'Data found', data: region };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async getCountryById(id: number): Promise<any> {
    const country = await this.regionsModel.findOne({
      include: [
        {
          model: this.countryModel,
        },
      ],
      where: { region_code: id },
    });
    return country;
  }

  async create(dto: CreateRegionDto): Promise<any> {
    try {
      const newRegion = await this.regionsModel.create(dto);
      return { message: 'Data created', data: newRegion };
    } catch (error) {
      return { message: 'Error creating data', error: error };
    }
  }

  async update(id: number, dto: UpdateRegionDto): Promise<any> {
    try {
      const region = await this.regionsModel.findByPk(id);
      if (region) {
        region.region_name = dto.region_name;
        await region.save();
        return { message: 'Data updated', data: region };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error updating data', error: error.message };
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const region = await this.regionsModel.findByPk(id);
      if (region) {
        await region.destroy();
        return { message: 'Data removed' };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error removing data', error: error.message };
    }
  }
}
