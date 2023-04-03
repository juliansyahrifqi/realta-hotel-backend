import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { country } from '../../../models/masterSchema';
// import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(country)
    private readonly countryModel: typeof country,
  ) {}

  async create(countryDto: CreateCountryDto): Promise<any> {
    try {
      const result = await this.countryModel.create(countryDto);
      return { message: 'Data created', data: result };
    } catch (error) {
      return { message: 'Error creating data', error: error.message };
    }
  }
  async findAll(): Promise<any> {
    try {
      const result = await this.countryModel.findAll();
      return { message: 'Data found', data: result };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const result = await this.countryModel.findByPk(id);
      if (!result) {
        return {
          message: 'Data country found',
          data: result,
        };
      } else {
        return { message: `Country with ID ${id} not found` };
      }
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async update(id: number, countryDto: UpdateCountryDto): Promise<any> {
    try {
      const updatedRows = await this.countryModel.update(countryDto, {
        where: { country_id: id },
      });
      if (updatedRows[0] === 0) {
        return { success: false, message: `Country with ID ${id} not found` };
      }
      const result = await this.countryModel.findByPk(id);
      return { success: 'Data succes', data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const deletedRows = await this.countryModel.destroy({
        where: { country_id: id },
      });
      if (deletedRows === 0) {
        return { success: false, message: `Country with ID ${id} not found` };
      }
      return {
        success: 'Data berhasil',
        message: `Country with ID ${id} deleted`,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
