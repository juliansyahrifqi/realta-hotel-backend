import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import {
  city,
  country,
  provinces,
  regions,
} from '../../../models/masterSchema';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(city)
    private readonly cityModel: typeof city,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<any> {
    try {
      const result = await this.cityModel.create(createCityDto);
      return { message: 'Data found', data: result };
    } catch (error) {
      return { message: 'Data not found', error: error.message };
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.cityModel.findAll({
        include: [
          {
            model: provinces,
            include: [{ model: country, include: [{ model: regions }] }],
          },
        ],
        order: [['city_name', 'ASC']],
      });
      return { message: 'Data found', data: result };
    } catch (error) {
      return { message: 'Data not found', error: error.message };
    }
  }

  async findAllSearch(searchQuery: string): Promise<any> {
    try {
      const data = await this.cityModel.findAll({
        include: [
          {
            model: provinces,
            include: [{ model: country, include: [{ model: regions }] }],
          },
        ],
        where: {
          city_name: { [Op.like]: `%${searchQuery}%` },
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // async findByName(cityName: string): Promise<any> {
  //   return this.cityModel.findAll({
  //     where: { city_name: cityName },
  //   });
  // }

  async findOne(id: number): Promise<any> {
    try {
      const result = await this.cityModel.findByPk(id);
      if (!result) {
        return { success: false, message: `City with ID ${id} not found` };
      }
      return { message: 'Data found', data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // async update(
  //   id: number,
  //   updateCityDto: UpdateCityDto,
  // ): Promise<[number, city[]]> {
  //   const [numRowsUpdated, updatedCity] = await this.cityModel.update(
  //     updateCityDto,
  //     {
  //       where: { city_id: id },
  //       returning: true,
  //     },
  //   );
  //   return [numRowsUpdated, updatedCity];
  // }
  async update(id: number, updateCityDto: UpdateCityDto): Promise<any> {
    try {
      const data = await this.cityModel.update(updateCityDto, {
        where: { city_id: id },
        returning: true,
      });
      return {
        message: 'Data updated successfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update data',
        error: error.message,
      };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const city = await this.cityModel.findByPk(id);
      await city.destroy();
      return { message: 'Data deleted' };
    } catch (error) {
      return { message: 'Error deleting data', error: error.message };
    }
  }
}
