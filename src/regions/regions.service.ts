import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { regions } from '../../models/master_module';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(regions)
    private readonly regionsModel: typeof regions,
  ) {}

  async findAll(): Promise<regions[]> {
    return this.regionsModel.findAll();
  }

  async findOne(id: number): Promise<regions> {
    return this.regionsModel.findByPk(id);
  }

  async create(dto: CreateRegionDto): Promise<regions> {
    return this.regionsModel.create(dto);
  }

  async update(id: number, dto: UpdateRegionDto): Promise<regions> {
    const region = await this.regionsModel.findByPk(id);
    region.region_name = dto.region_name;
    await region.save();
    return region;
  }

  async delete(id: number): Promise<void> {
    const region = await this.regionsModel.findByPk(id);
    await region.destroy();
  }
}
