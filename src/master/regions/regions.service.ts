import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { regions } from '../../../models/masterSchema';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(regions)
    private readonly regionsModel: typeof regions,
  ) {}

  async findAll(): Promise<any> {
    try {
      const regions = await this.regionsModel.findAll();
      return { message: 'Data found', data: regions };
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
