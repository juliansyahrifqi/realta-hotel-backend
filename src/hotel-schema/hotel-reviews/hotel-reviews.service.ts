import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hotels, hotel_reviews } from 'models/hotelSchema';
import { async } from 'rxjs';
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
  ) {}

  async create(createHotelReviewDto: CreateHotelReviewDto) {
    try {
      const data = await this.horeModel.create({
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
          hotel_rating_star: avgRating,
        },
        {
          where: {
            hotel_id: createHotelReviewDto.hore_hotel_id,
          },
        },
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const data = await this.horeModel.findAll({
        include: [{ model: hotels }],
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.horeModel.findOne({
        where: { hore_id: id },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateHotelReviewDto: UpdateHotelReviewDto) {
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
          hotel_rating_star: avgRating,
        },
        {
          where: {
            hotel_id: findOneHore.hore_hotel_id,
          },
        },
      );

      return dataHore;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
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
          hotel_rating_star: avgRating,
        },
        {
          where: {
            hotel_id: findOneHore.hore_hotel_id,
          },
        },
      );

      return `This action removes a #${id} hotelReview`;
    } catch (error) {
      return `error`;
    }
  }
}
