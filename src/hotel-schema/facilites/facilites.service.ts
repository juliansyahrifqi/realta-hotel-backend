import { Body, Injectable } from '@nestjs/common';
import { CreateFaciliteDto } from './dto/create-facilite.dto';
import { UpdateFaciliteDto } from './dto/update-facilite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { facilites } from '../../../models/hotelSchema';

@Injectable()
export class FacilitesService {
  constructor(
    @InjectModel(facilites)
    private facilitesModel: typeof facilites,
  ) {}

  async create(
    @Body() createFaciliteDto: CreateFaciliteDto,
  ): Promise<facilites> {
    const result = await this.facilitesModel.create(createFaciliteDto);
    return result;
  }

  async findAll(): Promise<facilites[]> {
    const result = await this.facilitesModel.findAll();
    return result;
  }

  async findOne(faci_id: number) {
    const result = await this.facilitesModel.findByPk(faci_id);
    return result;
  }

  async update(
    faci_id: number,
    updateFaciliteDto: UpdateFaciliteDto,
  ): Promise<any> {
    await this.facilitesModel.update(updateFaciliteDto, {
      where: { faci_id },
    });
    return `updated faci_id : ${faci_id} success`;
  }

  async remove(faci_id: number): Promise<any> {
    await this.facilitesModel.destroy({
      where: { faci_id },
    });
    return `deleted faci_id : ${faci_id} success`;
  }
}
