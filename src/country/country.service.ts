import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { country } from '../../models/master_module';
// import { CountryDto } from './dto/country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(country)
    private readonly countryModel: typeof country,
  ) {}

  async findAll(): Promise<any> {
    return this.countryModel.findAll();
  }

  async findOne(id: number): Promise<any> {
    return this.countryModel.findByPk(id);
  }

  async create(countryDto: CreateCountryDto): Promise<any> {
    return this.countryModel.create(countryDto);
  }

  async update(id: number, countryDto: UpdateCountryDto): Promise<any> {
    await this.countryModel.update(countryDto, {
      where: { country_id: id },
    });
    return this.countryModel.findByPk(id);
  }

  async delete(id: number): Promise<any> {
    await this.countryModel.destroy({ where: { country_id: id } });
  }
}
