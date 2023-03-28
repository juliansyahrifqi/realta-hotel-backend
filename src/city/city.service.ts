import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { city } from '../../models/master_module';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(city)
    private readonly cityModel: typeof city,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<any> {
    return this.cityModel.create(createCityDto);
  }

  async findAll(): Promise<any> {
    return this.cityModel.findAll();
  }

  async findAllSearch(searchQuery: string): Promise<city[]> {
    try {
      const data = await this.cityModel.findAll({
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
    return this.cityModel.findByPk(id);
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
    await this.cityModel.update(updateCityDto, {
      where: { city_id: id },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const city = await this.findOne(id);
    await city.destroy();
  }
}
