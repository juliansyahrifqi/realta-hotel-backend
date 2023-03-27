import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  facilities,
  facility_photos,
  facility_price_history,
} from 'models/hotelSchema';
import { users } from 'models/usersSchema';
import { Sequelize } from 'sequelize';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectModel(facilities)
    private faciModel: typeof facilities,

    @InjectModel(facility_price_history)
    private faphModel: typeof facility_price_history,
  ) {}
  async create(createFacilityDto: CreateFacilityDto) {
    try {
      const roomNumber = `H${createFacilityDto.faci_hotel_id}-${createFacilityDto.faci_room_number}`;

      const dataFaci = await this.faciModel
        .create({
          faci_name: createFacilityDto.faci_name,
          faci_description: createFacilityDto.faci_description,
          faci_max_number: createFacilityDto.faci_max_number,
          faci_measure_unit: createFacilityDto.faci_measure_unit,
          faci_room_number: roomNumber,
          faci_startdate: createFacilityDto.faci_startdate,
          faci_enddate: createFacilityDto.faci_enddate,
          faci_low_price: createFacilityDto.faci_low_price,
          faci_high_price: createFacilityDto.faci_high_price,
          faci_rate_price: createFacilityDto.faci_rate_price,
          faci_discount: createFacilityDto.faci_discount,
          faci_tax_rate: createFacilityDto.faci_tax_rate,
          faci_cagro_id: createFacilityDto.faci_cagro_id,
          faci_hotel_id: createFacilityDto.faci_hotel_id,
          faci_memb_name: createFacilityDto.faci_memb_name,
          faci_user_id: createFacilityDto.faci_user_id,
        })

        .then((data) => {
          return this.faphModel.create({
            faph_faci_id: data.faci_id,
            faph_startdate: data.faci_startdate,
            faph_enddate: data.faci_enddate,
            faph_low_price: data.faci_low_price,
            faph_high_price: data.faci_high_price,
            faph_rate_price: data.faci_rate_price,
            faph_discount: data.faci_discount,
            faph_tax_rate: data.faci_tax_rate,
            faph_modified_date: data.faci_modified_date,
            faph_user_id: data.faci_user_id,
          });
        });

      return `Berhasil di Tambahkan`;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const data = await this.faciModel.findAll({});
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAllIncludePriceHistory() {
    try {
      const data = await this.faciModel.findAll({
        include: [
          { model: facility_price_history, include: [{ model: users }] },
        ],
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAllIncludePhotos() {
    try {
      const data = await this.faciModel.findAll({
        include: [{ model: facility_photos }],
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} facility`;
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto) {
    try {
      //Membuat Penamaan untuk Room Number
      const roomNumber = `H${updateFacilityDto.faci_hotel_id}-${updateFacilityDto.faci_room_number}`;

      const data = await this.faciModel.update(
        {
          faci_name: updateFacilityDto.faci_name,
          faci_description: updateFacilityDto.faci_description,
          faci_max_number: updateFacilityDto.faci_max_number,
          faci_measure_unit: updateFacilityDto.faci_measure_unit,
          faci_room_number: roomNumber,
          faci_startdate: updateFacilityDto.faci_startdate,
          faci_enddate: updateFacilityDto.faci_enddate,
          //===============
          faci_low_price: updateFacilityDto.faci_low_price,
          faci_high_price: updateFacilityDto.faci_high_price,
          faci_rate_price: updateFacilityDto.faci_rate_price,
          faci_modified_date: Sequelize.literal('CURRENT_TIMESTAMP'),
          //===============
          faci_discount: updateFacilityDto.faci_discount,
          faci_tax_rate: updateFacilityDto.faci_tax_rate,
          faci_cagro_id: updateFacilityDto.faci_cagro_id,
          faci_hotel_id: updateFacilityDto.faci_hotel_id,
          faci_memb_name: updateFacilityDto.faci_memb_name,
          faci_user_id: updateFacilityDto.faci_user_id,
        },
        {
          where: { faci_id: id },
        },
      );

      const findOneFacilities = await this.faciModel
        .findOne({
          where: { faci_id: id },
        })
        .then((data) => {
          return this.faphModel.create({
            faph_faci_id: data.faci_id,
            faph_startdate: data.faci_startdate,
            faph_enddate: data.faci_enddate,
            faph_low_price: data.faci_low_price,
            faph_high_price: data.faci_high_price,
            faph_rate_price: data.faci_rate_price,
            faph_discount: data.faci_discount,
            faph_tax_rate: data.faci_tax_rate,
            faph_modified_date: data.faci_modified_date,
            faph_user_id: data.faci_user_id,
          });
        });
      return `This action updates a #${id} facility`;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.faciModel.destroy({
        where: { faci_id: id },
      });
      return `This action removes a #${id} facility`;
    } catch (error) {}
  }
}
