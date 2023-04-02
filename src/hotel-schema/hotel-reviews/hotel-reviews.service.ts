import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { hotels, hotel_reviews } from 'models/hotelSchema';
import { Sequelize } from 'sequelize';
import { CreateHotelReviewDto } from './dto/create-hotel-review.dto';
import { UpdateHotelReviewDto } from './dto/update-hotel-review.dto';

@Injectable()
export class HotelReviewsService {
  constructor(
    @InjectModel(hotel_reviews)
    private horeModel: typeof hotel_reviews,

    @InjectModel(hotels)
    private hotelsModel: typeof hotels,
  ) { }

  async create(
    @Res() response: Response,
    createHotelReviewDto: CreateHotelReviewDto,
  ) {
    try {
      const dataHore = await this.horeModel.create({
        hore_user_review: createHotelReviewDto.hore_user_review,
        hore_rating: createHotelReviewDto.hore_rating,
        hore_users_id: createHotelReviewDto.hore_user_id,
        hore_hotel_id: createHotelReviewDto.hore_hotel_id,
      });

      // Mengambil semua review untuk hotel tersebut
      const allReviews = await this.horeModel.findAll({
        where: {
          hore_hotel_id: createHotelReviewDto.hore_hotel_id,
        },
      });

      // Menghitung rata-rata nilai rating
      const totalRating = allReviews.reduce(
        (acc, { hore_rating }) => acc + hore_rating,
        0,
      );
      const avgRating = Number((totalRating / allReviews.length).toFixed(1));

      // Update nilai rating pada model hotels
      const updatedHotel = await this.hotelsModel.update(
        {
          hotel_rating_star: String(avgRating),
        },
        {
          where: {
            hotel_id: createHotelReviewDto.hore_hotel_id,
          },
        },
      );

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: 'Berhasil Di Tambahkan',
        data: dataHore,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findAll(@Res() response: Response) {
    try {
      const data = await this.horeModel.findAll();

      const dataResponse = {
        statusCode: HttpStatus.OK,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async findOne(@Res() response: Response, id: number) {
    try {
      const data = await this.horeModel.findOne({
        where: { hore_id: id },
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async update(
    @Res() response: Response,
    id: number,
    updateHotelReviewDto: UpdateHotelReviewDto,
  ) {
    try {
      const dataHore = await this.horeModel.update(
        {
          hore_user_review: updateHotelReviewDto.hore_user_review,
          hore_rating: updateHotelReviewDto.hore_rating,
          hore_created_on: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        { where: { hore_id: id } },
      );

      //=======================================================
      //Mencari data Hore
      const findOneHore = await this.horeModel.findOne({
        where: { hore_id: id },
      });

      // Mengambil semua review untuk hotel tersebut
      const allReviews = await this.horeModel.findAll({
        where: {
          hore_hotel_id: findOneHore.hore_hotel_id,
        },
      });

      // Menghitung rata-rata nilai rating
      const totalRating = allReviews.reduce(
        (acc, { hore_rating }) => acc + hore_rating,
        0,
      );
      const avgRating = Number((totalRating / allReviews.length).toFixed(1));

      // Update nilai rating pada model hotels
      const updatedHotel = await this.hotelsModel.update(
        {
          hotel_rating_star: String(avgRating),
        },
        {
          where: {
            hotel_id: findOneHore.hore_hotel_id,
          },
        },
      );

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Perbarui`,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  async remove(@Res() response: Response, id: number) {
    try {
      //Mencari data Hore
      const findOneHore = await this.horeModel.findOne({
        where: { hore_id: id },
      });
      //Menghapus Data Review
      const data = await this.horeModel.destroy({
        where: { hore_id: id },
      });

      // Mengambil semua review untuk hotel tersebut
      const allReviews = await this.horeModel.findAll({
        where: {
          hore_hotel_id: findOneHore.hore_hotel_id,
        },
      });

      // Menghitung rata-rata nilai rating
      const totalRating = allReviews.reduce(
        (acc, { hore_rating }) => acc + hore_rating,
        0,
      );
      const avgRating = Number((totalRating / allReviews.length).toFixed(1));

      console.log(`avgRating = ${avgRating}`);
      // Update nilai rating pada model hotels
      const updatedHotel = await this.hotelsModel.update(
        {
          hotel_rating_star: String(avgRating),
        },
        {
          where: {
            hotel_id: findOneHore.hore_hotel_id,
          },
        },
      );

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Hapus`,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }
}
