import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { provinces } from '../../models/master_module';
import { CreateProvincesDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectModel(provinces)
    private readonly provincesModel: typeof provinces,
  ) {}

  async create(createProvinceDto: CreateProvincesDto): Promise<provinces> {
    return this.provincesModel.create(createProvinceDto);
  }

  async findAll(): Promise<provinces[]> {
    return this.provincesModel.findAll();
  }

  async findOne(id: number): Promise<provinces> {
    return this.provincesModel.findByPk(id);
  }

  async update(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<[number, provinces[]]> {
    const [numOfAffectedRows, affectedRows] = await this.provincesModel.update(
      updateProvinceDto,
      { where: { prov_id: id }, returning: true },
    );
    return [numOfAffectedRows, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const province = await this.findOne(id);
    await province.destroy();
  }
}
