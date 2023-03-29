import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  facilities,
  facilities_support,
  hotels,
  hotel_reviews,
} from 'models/hotelSchema';
import { address, category_group, city } from 'models/masterSchema';
import { Op, Sequelize } from 'sequelize';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(hotels)
    private hotelsModel: typeof hotels,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    try {
      const dataCity = await city
        .create({
          city_name: createHotelDto.city_name,
        })
        .then((data) => {
          return address.create({
            addr_line1: createHotelDto.addr_line1,
            addr_line2: createHotelDto.addr_line2,
            addr_postal_code: createHotelDto.addr_postal_code,
            addr_city_id: data.city_id,
          });
        })
        .then((data) => {
          return this.hotelsModel.create({
            hotel_name: createHotelDto.hotel_name,
            hotel_phonenumber: createHotelDto.hotel_phonenumber,
            hotel_status: createHotelDto.hotel_status,
            hotel_addr_id: data.addr_id,
            hotel_description: createHotelDto.hotel_description,
          });
        });

      return 'Berhasil Di Tambahkan';
    } catch (error) {
      return error;
    }
  }

  async findAll(pageNumber = 1, pageSize = 10) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;

      const data = await this.hotelsModel.findAll({
        offset,
        limit,
      });

      return data;
    } catch (error) {
      return error;
    }
  }
  async findAllSearch(searchQuery = '') {
    try {
      const data = await this.hotelsModel.findAll({
        where: {
          hotel_name: { [Op.like]: `%${searchQuery}%` },
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  }
  async findAllIncludeReviews(pageNumber = 1, pageSize = 10) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [{ model: hotel_reviews }],
        offset,
        limit,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAllIncludeRoom(pageNumber = 1, pageSize = 10) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [{ model: facilities, include: [{ model: category_group }] }],
        offset,
        limit,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAllIncludeAddress(pageNumber = 1, pageSize = 10) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [
          {
            model: address,
            include: [{ model: city }],
          },
        ],
        offset,
        limit,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
  async findAllIncludeSupport(pageNumber = 1, pageSize = 10) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;
      const data = await this.hotelsModel.findAll({
        include: [
          {
            model: facilities_support,
          },
        ],
        offset,
        limit,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  async update(hotel_id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const dataHotel = await this.hotelsModel
        .update(
          {
            hotel_name: updateHotelDto.hotel_name,
            hotel_phonenumber: updateHotelDto.hotel_phonenumber,
            hotel_status: updateHotelDto.hotel_status,
            hotel_description: updateHotelDto.hotel_description,
            hotel_modified_date: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          {
            where: { hotel_id: hotel_id },
          },
        )
        .then((data) => {
          return address.update(
            {
              addr_line1: updateHotelDto.addr_line1,
              addr_line2: updateHotelDto.addr_line2,
              addr_postal_code: updateHotelDto.addr_postal_code,
            },
            {
              where: { addr_id: hotel_id },
            },
          );
        })
        .then((data) => {
          return city.update(
            {
              city_name: updateHotelDto.city_name,
            },
            {
              where: { city_id: hotel_id },
            },
          );
        });

      return `This action updates a #${hotel_id} hotel`;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(hotel_id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const data = await this.hotelsModel.update(
        {
          hotel_status: updateHotelDto.hotel_status,
          hotel_reason: updateHotelDto.hotel_reason,
        },
        { where: { hotel_id: hotel_id } },
      );
      return `This action updates a #${hotel_id} hotel`;
    } catch (error) {
      return error;
    }
  }

  async remove(@Param('id') id: number) {
    try {
      const idData = await this.hotelsModel.findOne({
        where: { hotel_id: id },
      });
      if (!idData) {
        return 'Data Tidak Di Temukan';
      }

      const hapus = await this.hotelsModel.destroy({
        where: { hotel_id: id },
      });

      return `Id ke-${id} Telah Berhasil Di Hapus`;
    } catch (error) {
      return error;
    }
  }
}
