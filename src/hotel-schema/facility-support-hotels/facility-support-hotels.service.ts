import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { facility_support_hotels } from 'models/hotelSchema';
import { CreateFacilitySupportHotelDto } from './dto/create-facility-support-hotel.dto';
import { UpdateFacilitySupportHotelDto } from './dto/update-facility-support-hotel.dto';

@Injectable()
export class FacilitySupportHotelsService {
  constructor(
    @InjectModel(facility_support_hotels)
    private fashoModel = facility_support_hotels,
  ) {}
  async create(createFacilitySupportHotelDto: CreateFacilitySupportHotelDto) {
    const data = await this.fashoModel.create({
      fsh_hotel_id: createFacilitySupportHotelDto.fsh_hotel_id,
      fsh_fs_id: createFacilitySupportHotelDto.fsh_fs_id,
    });
    return 'This action adds a new facilitySupportHotel';
  }

  async findAll() {
    try {
      const data = await this.fashoModel.findAll();
      return data;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    const data = await this.fashoModel.findOne({
      where: { fsh_id: id },
    });
    return `This action returns a #${id} facilitySupportHotel`;
  }

  async update(
    id: number,
    updateFacilitySupportHotelDto: UpdateFacilitySupportHotelDto,
  ) {
    try {
      const data = await this.fashoModel.update(
        {
          fsh_hotel_id: updateFacilitySupportHotelDto.fsh_hotel_id,
          fsh_fs_id: updateFacilitySupportHotelDto.fsh_fs_id,
        },
        {
          where: { fsh_id: id },
        },
      );
    } catch (error) {}
    return `This action updates a #${id} facilitySupportHotel`;
  }

  async remove(id: number) {
    const data = await this.fashoModel.destroy({
      where: { fsh_id: id },
    });
    return `This action removes a #${id} facilitySupportHotel`;
  }
}
