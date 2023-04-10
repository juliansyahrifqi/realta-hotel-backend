import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { city, country, provinces } from '../../../models/masterSchema';
import { CreateProvincesDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectModel(provinces)
    private readonly provincesModel: typeof provinces,
    @InjectModel(city)
    private readonly cityModel: typeof city,
  ) {}

  async create(createProvinceDto: CreateProvincesDto): Promise<any> {
    try {
      const newProvince = await this.provincesModel.create(createProvinceDto);
      return { message: 'Data created', data: newProvince };
    } catch (error) {
      return { message: 'Error creating data', error: error.message };
    }
  }

  async findAll(): Promise<any> {
    try {
      const provinces = await this.provincesModel.findAll();
      return { message: 'Data found', data: provinces };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const province = await this.provincesModel.findByPk(id);
      if (province) {
        return { message: 'Data found', data: province };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async getCityById(id: number): Promise<any> {
    const city = await this.provincesModel.findOne({
      include: [
        {
          model: this.cityModel,
        },
        {
          model: country,
        },
      ],
      where: { prov_id: id },
    });
    return city;
  }

  async update(id: number, updateProvinceDto: UpdateProvinceDto): Promise<any> {
    try {
      const [numOfAffectedRows, affectedRows] =
        await this.provincesModel.update(updateProvinceDto, {
          where: { prov_id: id },
          returning: true,
        });
      if (numOfAffectedRows > 0) {
        return { message: 'Data updated', data: affectedRows[0] };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error updating data', error: error.message };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const province = await this.provincesModel.findByPk(id);
      if (province) {
        await province.destroy();
        return { message: 'Data removed' };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error removing data', error: error.message };
    }
  }
}
