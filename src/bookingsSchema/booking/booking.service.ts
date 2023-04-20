import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  address,
  category_group,
  city,
  country,
  members,
  policy,
  policy_category_group,
  price_items,
  provinces,
  regions,
} from '../../../models/masterSchema';
import { DataType, Sequelize } from 'sequelize-typescript';
import {
  facilities,
  hotels,
  facilities_support,
  facility_photos,
  facility_support_hotels,
  hotel_reviews,
} from '../../../models/hotelSchema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { user_members, users } from 'models/usersSchema';
import { Op, where } from 'sequelize';
import {
  booking_order_detail,
  booking_order_detail_extra,
  booking_orders,
  special_offer_coupons,
  special_offers,
  user_breakfeast,
} from 'models/bookingSchema';
import { subtle } from 'crypto';
import { payment_transaction } from 'models/paymentSchema';



@Injectable()
export class BookingService {
  constructor(@InjectModel(hotels) private hotelsModel: typeof hotels, @InjectModel(facilities) private facilityModel: typeof facilities, @InjectModel(booking_orders) private bookingOrdersModel: typeof booking_orders, @InjectModel(booking_order_detail) private bookingOrderDetailModel: typeof booking_order_detail, @InjectModel(special_offers) private specialOfferModel: typeof special_offers, @InjectModel(special_offer_coupons) private specialOfferCouponsModel: typeof special_offer_coupons, @InjectModel(booking_order_detail_extra) private bookingOrderDetailExtraModel: typeof booking_order_detail_extra, @InjectModel(price_items) private priceItemsModel: typeof price_items, @InjectModel(user_breakfeast) private userBreakFeastModel: typeof user_breakfeast, private sequelize: Sequelize) { }
  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  async findBookingAllHotel(
    page: number,
    limit: number,
    cityName: string,
    provName: string,
    countryName: string,
    regionName: string,
    facilities_support_filter: any[]) {
    try {

      const dataBookingHotels = await this.facilityModel.findAll({

        include: [
          {
            model: hotels,

            include: [
              {
                model: address,
                include: [
                  {
                    model: city,
                    where: cityName ? { city_name: cityName } : {},
                    include: [
                      {
                        model: provinces,
                        where: provName ? { prov_name: provName } : {},
                        include: [
                          {
                            model: country,
                            where: countryName ? { country_name: countryName } : {},
                            include: [
                              {
                                model: regions,
                                where: regionName ? { region_name: regionName } : {},
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              { model: hotel_reviews, attributes: ['hore_rating'] },
            ],
          },
        ],

      }).catch((err) => {
        throw err
      })
      console.log(dataBookingHotels)

      const dataFaciPhoto = await this.facilityModel.findAll({
        include: {
          model: facility_photos,
        },
      });
      const dataHotel = await this.hotelsModel.findAll({
        include: [{
          model: facilities_support,

        }]
      })



      const hotelsData = dataHotel.reduce((acc, hotel) => {
        acc[hotel.hotel_id] = {
          facilities_support: hotel.facilities_support,
        };
        return acc;
      }, {});

      const dataBookingHotelsWithFacilities = dataBookingHotels.map((facility) => {
        const hotelData = hotelsData[facility.hotel.hotel_id];
        return {
          ...JSON.parse(JSON.stringify(facility)),
          hotel: {
            ...JSON.parse(JSON.stringify(facility.hotel)),
            ...hotelData
          }
        };
      });

      const dataBookingHotelsWithPhotos = dataBookingHotelsWithFacilities.map(
        (facility) => {
          const facilityPhotos = dataFaciPhoto.find(
            (fp) => fp.faci_id === facility.faci_id,
          )?.facility_photos;
          return {
            ...facility,
            facility_photos: facilityPhotos,
          };
        },
      );

      let filteredData = [];
      if (dataBookingHotelsWithPhotos) {
        filteredData = dataBookingHotelsWithPhotos.filter((data) => {
          return data.hotel.address !== null;
        });

        if (facilities_support_filter) {
          filteredData = filteredData.filter((data) => {

            if (data.hotel.facilities_support) {

              console.log(data.hotel.facilities_support.some((fs: any) => facilities_support_filter.includes(fs.fs_name)))
              return data.hotel.facilities_support.some((fs: any) => facilities_support_filter.includes(fs.fs_name));
            }
            return false;
          });


        }
      }

      const totalData = filteredData.length;
      // const startIndex = (page - 1) * limit;
      // const endIndex = page * limit;
      // console.log(`Halaman start Index ${startIndex} dan Halaman End Index ${endIndex}`)

      // let data = filteredData.slice(startIndex, endIndex);
      let dataNew = [...filteredData];

      dataNew = dataNew.map((e) => {
        let sumRating = 0;
        let sumRatingLength = 0;
        const jumlahReviewsHotel = e.hotel.hotel_reviews.length;
        const hotelReviewsAtr = {
          ...e.hotel,
          hotel_reviews_count: jumlahReviewsHotel,
        };

        hotelReviewsAtr.hotel_reviews.forEach((hr: any) => {
          sumRating += hr.hore_rating;
          sumRatingLength++;
        });

        const hotelRatingStarAverage = {
          ...hotelReviewsAtr,
          hotel_rating_star: (sumRating / sumRatingLength).toFixed(2)
            ? (sumRating / sumRatingLength).toFixed(2).toString()
            : Number(0).toString(),
        };

        let ratingDescription = '';
        const ratingStar = parseFloat(hotelRatingStarAverage.hotel_rating_star);

        if (ratingStar >= 4.5) {
          ratingDescription = 'Excellent';
        } else if (ratingStar >= 4) {
          ratingDescription = 'Very Good';
        } else if (ratingStar >= 3.5) {
          ratingDescription = 'Good';
        } else if (ratingStar >= 3) {
          ratingDescription = 'Fair';
        } else {
          ratingDescription = 'Poor';
        }

        return {
          ...e,
          faci_keterangan_book: 'per room per night',
          hotel: {
            ...hotelRatingStarAverage,
            hotel_rating_status: ratingDescription, // Menambahkan atribut rating_description
          },
        };
      });



      return { dataNew, totalData, dataBookingHotels };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findFaciById(
    id_hotel: string,
    dataIdFilter: number[],
    startDate: string,
    endDate: string,
  ) {
    try {
      const dataFaciBook = await this.facilityModel
        .findAll({
          attributes: [
            'faci_id',
            'faci_name',
            'faci_room_number',
            'faci_startdate',
            'faci_enddate',
            'faci_discount',
            'faci_tax_rate',
            'faci_rate_price',
            'faci_max_number',
            'faci_memb_name',
          ],
          where: {
            faci_id: {
              [Op.in]: dataIdFilter,
            },
          },
          include: [
            {
              model: hotels,
              where: {
                hotel_id: id_hotel,
              },
              include: [
                {
                  model: address,
                  include: [
                    {
                      model: city,
                      include: [
                        {
                          model: provinces,

                          include: [
                            {
                              model: country,
                              include: [
                                {
                                  model: regions,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: hotel_reviews,
                  include: [
                    {
                      model: users,
                    },
                  ],
                },
                {
                  model: facilities_support,
                },
              ],
            },
            { model: facility_photos },
            {
              model: category_group,
              where: { cagro_name: 'Room' },
              include: [
                {
                  model: policy,
                  attributes: ['poli_id', 'poli_name', 'poli_description'],
                },
              ],
            },
          ],
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });

      const dataFaciBookUp = dataFaciBook.map((data: any) => {
        let priceRate = 0;
        const hore_reviews: any[] = data.hotel.hotel_reviews;
        const ratings_count: { [key: string]: number } = {
          '5': 0,
          '4': 0,
          '3': 0,
          '2': 0,
          '1': 0,
        };
        if (data.faci_rate_price.length > 0) {
          priceRate = parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, ''));

          // Hitung selisih hari antara startDate dan endDate
          const start = new Date(startDate);
          start.setDate(start.getDate() + 1); // mengambil tanggal selanjutnya
          const end = new Date(endDate);
          end.setDate(end.getDate() + 1); // mengambil tanggal selanjutnya
          const diff = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 3600 * 24),
          );

          console.log(start);
          // Hitung harga total berdasarkan selisih hari
          const priceDiscount = priceRate - data.faci_discount * priceRate;
          let subTotal = priceDiscount + data.faci_tax_rate * priceDiscount;
          console.log(
            `Diskon = ${data.faci_discount * priceRate} dan Pajak = ${
              data.faci_tax_rate * priceDiscount
            }`,
          );
          subTotal *= diff;
          const faci_rate_price_converse =
            parseInt(data.faci_rate_price.replace(/[^0-9.-]+/g, '')) * diff;
          const rpSubTotal = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(subTotal);

          const rpFaciRatePrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(faci_rate_price_converse);

          for (const review of data.hotel.hotel_reviews) {
            ratings_count[review.hore_rating.toString()] += 1;
          }

          const total_reviews = hore_reviews.length;
          const percentages: { [key: string]: string } = {
            '5': `${
              Math.round((ratings_count['5'] / total_reviews) * 100)
                ? Math.round((ratings_count['5'] / total_reviews) * 100)
                : 0
            }%`,
            '4': `${
              Math.round((ratings_count['4'] / total_reviews) * 100)
                ? Math.round((ratings_count['4'] / total_reviews) * 100)
                : 0
            }%`,
            '3': `${
              Math.round((ratings_count['3'] / total_reviews) * 100)
                ? Math.round((ratings_count['3'] / total_reviews) * 100)
                : 0
            }%`,
            '2': `${
              Math.round((ratings_count['2'] / total_reviews) * 100)
                ? Math.round((ratings_count['2'] / total_reviews) * 100)
                : 0
            }%`,
            '1': `${
              Math.round((ratings_count['1'] / total_reviews) * 100)
                ? Math.round((ratings_count['1'] / total_reviews) * 100)
                : 0
            }%`,
          };

          let sumRating = 0;
          let sumRatingLength = 0;
          const jumlahReviewsHotel = data.hotel.hotel_reviews.length;
          const hotelReviewsAtr = {
            ...data.hotel,
            hotel_reviews_count: jumlahReviewsHotel,
          };

          hotelReviewsAtr.hotel_reviews.forEach((hr: any) => {
            sumRating += hr.hore_rating;
            sumRatingLength++;
          });

          const hotelRatingStarAverage = {
            ...hotelReviewsAtr,
            hotel_rating_star:
              sumRating / sumRatingLength
                ? (sumRating / sumRatingLength).toString()
                : Number(0).toString(),
          };

          let ratingDescription = '';
          const ratingStar = parseFloat(
            hotelRatingStarAverage.hotel_rating_star,
          );

          if (ratingStar >= 4.5) {
            ratingDescription = 'Excellent';
          } else if (ratingStar >= 4) {
            ratingDescription = 'Very Good';
          } else if (ratingStar >= 3.5) {
            ratingDescription = 'Good';
          } else if (ratingStar >= 3) {
            ratingDescription = 'Fair';
          } else {
            ratingDescription = 'Poor';
          }

          const dataObj = {
            ...data.toJSON(),
            faci_rate_price: rpFaciRatePrice,
            faci_subtotal: rpSubTotal,
            count_night: `${diff} nights`,
            checkin: start,
            checkout: end,

            hotel: {
              ...data.hotel.toJSON(),
              hotel_review_percentage: percentages,
              hotel_rating_final_star: ratingStar.toFixed(2),
              hotel_review_count: jumlahReviewsHotel,
              hotel_rating_status: ratingDescription,
            },
          };
          delete dataObj.parent;

          return dataObj;
        }
      });

      return { data: dataFaciBookUp, jumlahData: dataFaciBookUp.length };
    } catch (error) {
      return error;
    }
  }

  async findAllRoomsByCateAndHotel(
    IdHotel: string,
    NotRoomName: string,
    IdCagro: string,
  ) {
    try {
      const dataAllRooms = await this.facilityModel
        .findAll({
          attributes: [
            'faci_id',
            'faci_name',
            'faci_room_number',
            'faci_discount',
            'faci_tax_rate',
            'faci_high_price',
            'faci_rate_price',
            'faci_max_number',
          ],
          where: {
            faci_name: {
              [Op.notILike]: NotRoomName,
            },
          },
          include: [
            {
              model: facility_photos,
              where: {
                fapho_primary: '1',
              },
            },
            {
              model: hotels,
              attributes: ['hotel_id', 'hotel_name'],
              where: {
                hotel_id: IdHotel,
              },
            },
            {
              model: category_group,
              where: {
                cagro_id: Number(IdCagro),
              },
            },
          ],
        })
        .catch((err) => {
          console.log(err);
        });

      return dataAllRooms;
    } catch (error) {
      return error;
    }
  }
  async createTemporaryBooking(dataOrder: {
    booking_orders: {
      boor_hotel_id: number;
      boor_user_id: number;
      booking_order_detail: any[];
    };
  }) {
    try {
      const dataBookingOrders = await this.bookingOrdersModel.create({
        boor_hotel_id: dataOrder.booking_orders.boor_hotel_id,
        boor_user_id: dataOrder.booking_orders.boor_user_id,
      });

      const dataAll = dataOrder.booking_orders.booking_order_detail.map(
        (data2: any) => {
          return { border_boor_id: dataBookingOrders.boor_id, ...data2 };
        },
      );

      // const dataBookingOrderDetail = await booking_order_detail.bulkCreate(dataAll.booking_order_detail).catch((err) => {
      //   console.log(err)
      // })
      const dataBookingOrderDetail = await this.bookingOrderDetailModel
        .bulkCreate(dataAll)
        .catch((err) => {
          console.log(err);
        });

      const dataAllBookingDetail = await this.bookingOrderDetailModel
        .findAll({
          where: {
            border_boor_id: 20,
          },
          include: [
            {
              model: facilities,
              include: [
                {
                  model: hotels,
                  include: [
                    {
                      model: address,
                      include: [
                        {
                          model: city,
                          include: [
                            {
                              model: provinces,

                              include: [
                                {
                                  model: country,
                                  include: [
                                    {
                                      model: regions,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        })
        .catch((err) => {
          console.log(err);
        });

      // const responseData = { facilities_id: dataAllBookingDetail[0].faci_id, facilities_main_name: dataAllBookingDetail[0].faci_name, faci_address_line_1: dataAllBookingDetail[0].facility.hotel.address.addr_line1, faci_address_line_2: dataAllBookingDetail[0].facility.hotel.address.city.city_name, faci_checkin_and_checkout: dataAllBookingDetail[0].facility.hotel.hotel_rating_star }
      return dataBookingOrderDetail;
    } catch (error) {
      return error;
    }
  }
  async getfinalBookingRooms(
    IdOrderDetail: number,
    IdUser: number,
    CheckIn: any,
    CheckOut: any,
    TotalGuest: number,
    TotalRooms: number,
  ) {
    try {
      const dataUser = await users.findOne({
        where: {
          user_id: IdUser,
        },
        include: [
          {
            model: members,
          },
        ],
      });

      const dataOrderDetail = await this.bookingOrderDetailModel.findAll({
        include: [
          {
            model: facilities,
            include: [
              {
                model: hotels,
                include: [
                  {
                    model: address,
                    include: [
                      {
                        model: city,
                        include: [
                          {
                            model: provinces,

                            include: [
                              {
                                model: country,
                                include: [
                                  {
                                    model: regions,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  { model: hotel_reviews },
                ],
              },
              { model: facility_photos },
            ],
          },
        ],
        where: {
          border_boor_id: IdOrderDetail,
        },
      });
      let bonusMember = 0;

      dataOrderDetail.forEach((data) => {
        dataUser.members.forEach((data2) => {
          if (data.facility.faci_memb_name === data2.memb_name) {
            bonusMember = bonusMember + data2.user_members.usme_points;
          }
        });
      });
      const hore_reviews: any[] =
        dataOrderDetail[0].facility.hotel.hotel_reviews;
      const ratings_count: { [key: string]: number } = {
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0,
      };

      for (const review of dataOrderDetail[0].facility.hotel.hotel_reviews) {
        ratings_count[review.hore_rating.toString()] += 1;
      }

      const total_reviews = hore_reviews.length;
      const percentages: { [key: string]: string } = {
        '5': `${
          Math.round((ratings_count['5'] / total_reviews) * 100)
            ? Math.round((ratings_count['5'] / total_reviews) * 100)
            : 0
        }%`,
        '4': `${
          Math.round((ratings_count['4'] / total_reviews) * 100)
            ? Math.round((ratings_count['4'] / total_reviews) * 100)
            : 0
        }%`,
        '3': `${
          Math.round((ratings_count['3'] / total_reviews) * 100)
            ? Math.round((ratings_count['3'] / total_reviews) * 100)
            : 0
        }%`,
        '2': `${
          Math.round((ratings_count['2'] / total_reviews) * 100)
            ? Math.round((ratings_count['2'] / total_reviews) * 100)
            : 0
        }%`,
        '1': `${
          Math.round((ratings_count['1'] / total_reviews) * 100)
            ? Math.round((ratings_count['1'] / total_reviews) * 100)
            : 0
        }%`,
      };

      let sumRating = 0;
      let sumRatingLength = 0;
      const jumlahReviewsHotel =
        dataOrderDetail[0].facility.hotel.hotel_reviews.length;
      const hotelReviewsAtr = {
        ...dataOrderDetail[0].facility.hotel,
        hotel_reviews_count: jumlahReviewsHotel,
      };

      hotelReviewsAtr.hotel_reviews.forEach((hr: any) => {
        sumRating += hr.hore_rating;
        sumRatingLength++;
      });

      const hotelRatingStarAverage = {
        ...hotelReviewsAtr,
        hotel_rating_star: (sumRating / sumRatingLength).toFixed(2)
          ? (sumRating / sumRatingLength).toFixed(2).toString()
          : Number(0).toString(),
      };

      let ratingDescription = '';
      const ratingStar = parseFloat(hotelRatingStarAverage.hotel_rating_star);

      if (ratingStar >= 4.5) {
        ratingDescription = 'Excellent';
      } else if (ratingStar >= 4) {
        ratingDescription = 'Very Good';
      } else if (ratingStar >= 3.5) {
        ratingDescription = 'Good';
      } else if (ratingStar >= 3) {
        ratingDescription = 'Fair';
      } else {
        ratingDescription = 'Poor';
      }
      let totalPrice = 0;
      let subTotal = 0;

      dataOrderDetail.forEach((data) => {
        const priceTotalConverse = parseFloat(
          data.borde_price.replace(/[^0-9.-]+/g, ''),
        );
        const subTotalConverse = parseFloat(
          data.borde_subtotal.replace(/[^0-9.-]+/g, ''),
        );

        totalPrice = totalPrice + priceTotalConverse;
        subTotal = subTotal + subTotalConverse;
      });
      subTotal = subTotal - bonusMember;
      const dataRes = {
        boor_id: dataOrderDetail[0].border_boor_id,
        boor_border_hotel_book_name:
          dataOrderDetail[0].facility.hotel.hotel_name,
        boor_border_rooms_address1:
          dataOrderDetail[0].facility.hotel.address.addr_line1,
        boor_border_rooms_address_city:
          dataOrderDetail[0].facility.hotel.address.city.city_name,
        boor_border_hotel_rating: ratingStar,
        boor_border_hotel_rating_length: jumlahReviewsHotel,
        boor_border_hotel_rating_status: ratingDescription,
        boor_border_hotel_checkin_checkout: `${CheckIn} ${CheckOut}`,
        boor_border_hotel_rooms_total_rooms: TotalRooms,
        boor_border_hotel_rooms_total_guest: TotalGuest,
        boor_border_rooms_name: dataOrderDetail[0].facility.faci_name,
        boor_border_rooms_price: dataOrderDetail[0].borde_price,
        boor_border_rooms_percent_discount: `${
          100 * Number(dataOrderDetail[0].facility.faci_discount)
        }%`,
        boor_border_rooms_percent_tax: `${
          100 * Number(dataOrderDetail[0].facility.faci_tax_rate)
        }%`,
        boor_border_rooms_price_total: totalPrice,
        boor_border_rooms_sub_total: subTotal,
        boor_border_rooms_bonus_member: bonusMember,
      };
      // console.log(dataOrderDetail.facility.faci_memb_name)
      return { dataRes, dataCache: dataOrderDetail };
    } catch (error) {
      return error;
    }
  }

  async getAllListSameRoom(
    IdHotel: number,
    IdRoom: number,
    SeriesRoom: string,
  ) {
    try {
      const dataListSameRoom = await this.facilityModel.findAll({
        where: {
          faci_hotel_id: IdHotel,
          faci_name: SeriesRoom,
          faci_id: {
            [Op.ne]: IdRoom,
          },
        },
      });
      return dataListSameRoom;
    } catch (err) {
      return err;
    }
  }

  async getAllSpecialOffer(IdBoor: string) {
    try {
      const getAllUserSpecialOffer = await this.bookingOrderDetailModel
        .findAll({
          include: [
            {
              model: booking_orders,
              include: [
                {
                  model: users,
                  include: [
                    {
                      model: user_members,
                    },
                  ],
                },
              ],
            },
          ],
          where: {
            border_boor_id: Number(IdBoor),
          },
        })
        .catch((err) => {
          console.log(err);
        });

      const getAllSpecialOffer = await this.specialOfferModel.findAll({
        where: {
          spof_type: getAllUserSpecialOffer[0].booking_orders.users.user_type,
        },
      });

      return getAllSpecialOffer;
    } catch (error) {
      return error;
    }
  }

  async pickSpecialOfferFinal(
    pick: any,
    IdUser: any,
    TotalGuest: number,
    TotalRooms: number,
  ) {
    try {
      // console.log([...pick.special_offers])
      const dataSpecialOfferCoupons =
        await this.specialOfferCouponsModel.bulkCreate(
          [...pick.special_offers],
          { fields: ['soco_borde_id', 'soco_spof_id'] },
        );

      const dataUser = await users.findOne({
        where: {
          user_id: Number(IdUser),
        },
        include: [
          {
            model: members,
          },
        ],
      });

      const dataAllBookingDetailSpecialOffers =
        await this.bookingOrderDetailModel.findAll({
          where: {
            borde_id: {
              [Op.in]: [
                ...dataSpecialOfferCoupons.map((data) => {
                  return data.soco_borde_id;
                }),
              ],
            },
          },
          include: [
            {
              model: special_offers,

              where: {
                spof_id: {
                  [Op.in]: [
                    ...dataSpecialOfferCoupons.map((data) => {
                      return data.soco_spof_id;
                    }),
                  ],
                },
              },
            },
            {
              model: facilities,
              include: [
                {
                  model: hotels,
                  include: [
                    {
                      model: address,
                      include: [
                        {
                          model: city,
                          include: [
                            {
                              model: provinces,

                              include: [
                                {
                                  model: country,
                                  include: [
                                    {
                                      model: regions,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { model: hotel_reviews },
                  ],
                },
              ],
            },
          ],
        });
      let totalBonusCoupons = 0;

      dataAllBookingDetailSpecialOffers.forEach((item) => {
        totalBonusCoupons =
          totalBonusCoupons + item.special_offers[0].spof_discount;
      });

      let bonusMember = 0;

      dataAllBookingDetailSpecialOffers.forEach((data) => {
        dataUser.members.forEach((data2) => {
          if (data.facility.faci_memb_name === data2.memb_name) {
            bonusMember = bonusMember + data2.user_members.usme_points;
          }
        });
      });

      const hore_reviews: any[] =
        dataAllBookingDetailSpecialOffers[0].facility.hotel.hotel_reviews;
      const ratings_count: { [key: string]: number } = {
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0,
      };

      for (const review of dataAllBookingDetailSpecialOffers[0].facility.hotel
        .hotel_reviews) {
        ratings_count[review.hore_rating.toString()] += 1;
      }

      const total_reviews = hore_reviews.length;
      const percentages: { [key: string]: string } = {
        '5': `${
          Math.round((ratings_count['5'] / total_reviews) * 100)
            ? Math.round((ratings_count['5'] / total_reviews) * 100)
            : 0
        }%`,
        '4': `${
          Math.round((ratings_count['4'] / total_reviews) * 100)
            ? Math.round((ratings_count['4'] / total_reviews) * 100)
            : 0
        }%`,
        '3': `${
          Math.round((ratings_count['3'] / total_reviews) * 100)
            ? Math.round((ratings_count['3'] / total_reviews) * 100)
            : 0
        }%`,
        '2': `${
          Math.round((ratings_count['2'] / total_reviews) * 100)
            ? Math.round((ratings_count['2'] / total_reviews) * 100)
            : 0
        }%`,
        '1': `${
          Math.round((ratings_count['1'] / total_reviews) * 100)
            ? Math.round((ratings_count['1'] / total_reviews) * 100)
            : 0
        }%`,
      };

      let sumRating = 0;
      let sumRatingLength = 0;
      const jumlahReviewsHotel =
        dataAllBookingDetailSpecialOffers[0].facility.hotel.hotel_reviews
          .length;
      const hotelReviewsAtr = {
        ...dataAllBookingDetailSpecialOffers[0].facility.hotel,
        hotel_reviews_count: jumlahReviewsHotel,
      };

      hotelReviewsAtr.hotel_reviews.forEach((hr: any) => {
        sumRating += hr.hore_rating;
        sumRatingLength++;
      });

      const hotelRatingStarAverage = {
        ...hotelReviewsAtr,
        hotel_rating_star: (sumRating / sumRatingLength).toFixed(2)
          ? (sumRating / sumRatingLength).toFixed().toString()
          : Number(0).toString(),
      };

      let ratingDescription = '';
      const ratingStar = parseFloat(hotelRatingStarAverage.hotel_rating_star);

      if (ratingStar >= 4.5) {
        ratingDescription = 'Excellent';
      } else if (ratingStar >= 4) {
        ratingDescription = 'Very Good';
      } else if (ratingStar >= 3.5) {
        ratingDescription = 'Good';
      } else if (ratingStar >= 3) {
        ratingDescription = 'Fair';
      } else {
        ratingDescription = 'Poor';
      }

      let totalPrice = 0;
      let subTotal = 0;

      dataAllBookingDetailSpecialOffers.forEach((data) => {
        const priceTotalConverse = parseFloat(
          data.borde_price.replace(/[^0-9.-]+/g, ''),
        );
        const subTotalConverse = parseFloat(
          data.borde_subtotal.replace(/[^0-9.-]+/g, ''),
        );

        totalPrice = totalPrice + priceTotalConverse;
        subTotal = subTotal + subTotalConverse;
      });
      console.log(subTotal);
      subTotal = subTotal - totalBonusCoupons;
      subTotal = subTotal - bonusMember;

      const dataRes = {
        boor_id: dataAllBookingDetailSpecialOffers[0].border_boor_id,
        boor_border_hotel_book_name:
          dataAllBookingDetailSpecialOffers[0].facility.hotel.hotel_name,
        boor_border_rooms_address1:
          dataAllBookingDetailSpecialOffers[0].facility.hotel.address
            .addr_line1,
        boor_border_rooms_address_city:
          dataAllBookingDetailSpecialOffers[0].facility.hotel.address.city
            .city_name,
        boor_border_hotel_rating: ratingStar,
        boor_border_hotel_rating_length: total_reviews,
        boor_border_hotel_rating_status: ratingDescription,
        boor_border_hotel_checkin_checkout: `${dataAllBookingDetailSpecialOffers[0].borde_checkin} ${dataAllBookingDetailSpecialOffers[0].borde_checkout}`,
        boor_border_hotel_rooms_total_rooms: TotalRooms,
        boor_border_hotel_rooms_total_guest: TotalGuest,
        boor_border_rooms_name:
          dataAllBookingDetailSpecialOffers[0].facility.faci_name,
        boor_border_rooms_price:
          dataAllBookingDetailSpecialOffers[0].borde_price,
        boor_border_rooms_percent_discount: `${
          100 *
          Number(dataAllBookingDetailSpecialOffers[0].facility.faci_discount)
        }%`,
        boor_border_rooms_percent_tax: `${
          100 *
          Number(dataAllBookingDetailSpecialOffers[0].facility.faci_tax_rate)
        }%`,
        boor_border_rooms_price_total: totalPrice,
        boor_border_rooms_sub_total: subTotal,
        boor_border_rooms_bonus_member: bonusMember,
        boor_borde_room_bonus_coupons: totalBonusCoupons,
      };
      // console.log(dataOrderDetail.facility.faci_memb_name)
      return { dataRes, dataCache: dataAllBookingDetailSpecialOffers };
    } catch (error) {
      return error;
    }
  }

  async pickExtraItemsBuyFinal(
    pick: any,
    IdUser: any,
    TotalGuest: number,
    TotalRooms: number,
  ) {
    try {
      const dataExtraItems = await this.bookingOrderDetailExtraModel.bulkCreate(
        [...pick.booking_order_detail_extra],
        {
          fields: [
            'boex_price',
            'boex_qty',
            'boex_subtotal',
            'boex_measure_unit',
            'boex_borde_id',
            'boex_prit_id',
          ],
        },
      );

      const dataUser = await users.findOne({
        where: {
          user_id: Number(IdUser),
        },
        include: [
          {
            model: members,
          },
        ],
      });

      // let dataBorderCoupons = await this.specialOfferCouponsModel.findAll({
      //   where: {
      //     soco_spof_id: {
      //       [Op.in]: [...new Set([...dataExtraItems.map((data) => {
      //         return data.boex_borde_id
      //       })])]
      //     }
      //   }, include: [{
      //     model: special_offers
      //   }]
      // })

      // const dataAllBookingDetailExtraItems = await this.bookingOrderDetailModel.findAll({

      //   where: {
      //     borde_id: {
      //       [Op.in]: [...new Set([...dataExtraItems.map((data) => {
      //         return data.boex_borde_id
      //       })])]
      //     }
      //   },
      //   include: [{
      //     model: special_offer_coupons,

      //     where: {
      //       soco_borde_id: {
      //         [Op.in]: [...new Set([...dataExtraItems.map((data) => {
      //           return data.boex_borde_id
      //         })])]
      //       },
      //     },
      //     include: [{
      //       model: special_offers
      //     }]
      //   }, {
      //     model: facilities,
      //     include: [{
      //       model: hotels,
      //       include: [{
      //         model: address,
      //         include: [{
      //           model: city,
      //           include: [
      //             {
      //               model: provinces,

      //               include: [
      //                 {
      //                   model: country,
      //                   include: [
      //                     {
      //                       model: regions,
      //                     },
      //                   ],
      //                 },
      //               ],
      //             },
      //           ],
      //         }]
      //       }, { model: hotel_reviews }]
      //     }]

      //   }, { model: booking_order_detail_extra }]
      // })
      // let totalBonusCoupons = 0

      // dataAllBookingDetailExtraItems.forEach((item) => {
      //   totalBonusCoupons = totalBonusCoupons + item.special_offer_coupons_borde[0].special_offers.spof_discount
      // })

      // // console.log(totalBonusCoupons)
      // let bonusMember = 0

      // dataAllBookingDetailExtraItems.forEach((data) => {
      //   dataUser.members.forEach((data2) => {
      //     if (data.facility.faci_memb_name === data2.memb_name) {
      //       bonusMember = bonusMember + data2.user_members.usme_points
      //     }
      //   })
      // })

      // let bodePrice = 0
      // let bordePriceSub = 0
      // dataAllBookingDetailExtraItems.forEach((item) => {
      //   item.boex.forEach((data3) => {
      //     bordePriceSub = bordePriceSub + parseInt(data3.boex_subtotal.replace(/[^0-9.-]+/g, ''))
      //   })

      //   bodePrice = bodePrice + bordePriceSub
      // })

      // console.log(bodePrice)

      // const hore_reviews: any[] = dataAllBookingDetailExtraItems[0].facility.hotel.hotel_reviews;
      // const ratings_count: { [key: string]: number } = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };

      // for (const review of dataAllBookingDetailExtraItems[0].facility.hotel.hotel_reviews) {
      //   ratings_count[review.hore_rating.toString()] += 1;
      // }

      // const total_reviews = hore_reviews.length
      // const percentages: { [key: string]: string } = {
      //   '5': `${Math.round(ratings_count['5'] / total_reviews * 100) ? Math.round(ratings_count['5'] / total_reviews * 100) : 0}%`,
      //   '4': `${Math.round(ratings_count['4'] / total_reviews * 100) ? Math.round(ratings_count['4'] / total_reviews * 100) : 0}%`,
      //   '3': `${Math.round(ratings_count['3'] / total_reviews * 100) ? Math.round(ratings_count['3'] / total_reviews * 100) : 0}%`,
      //   '2': `${Math.round(ratings_count['2'] / total_reviews * 100) ? Math.round(ratings_count['2'] / total_reviews * 100) : 0}%`,
      //   '1': `${Math.round(ratings_count['1'] / total_reviews * 100) ? Math.round(ratings_count['1'] / total_reviews * 100) : 0}%`,
      // };

      // let sumRating = 0
      // let sumRatingLength = 0
      // let jumlahReviewsHotel = dataAllBookingDetailExtraItems[0].facility.hotel.hotel_reviews.length
      // let hotelReviewsAtr = { ...dataAllBookingDetailExtraItems[0].facility.hotel, hotel_reviews_count: jumlahReviewsHotel }

      // hotelReviewsAtr.hotel_reviews.forEach((hr: any) => {
      //   sumRating += hr.hore_rating
      //   sumRatingLength++
      // })

      // let hotelRatingStarAverage = { ...hotelReviewsAtr, hotel_rating_star: (sumRating / sumRatingLength) ? (sumRating / sumRatingLength).toString() : Number(0).toString() }

      // let ratingDescription = '';
      // let ratingStar = parseFloat(hotelRatingStarAverage.hotel_rating_star);

      // if (ratingStar >= 4.5) {
      //   ratingDescription = 'Excellent';
      // } else if (ratingStar >= 4) {
      //   ratingDescription = 'Very Good';
      // } else if (ratingStar >= 3.5) {
      //   ratingDescription = 'Good';
      // } else if (ratingStar >= 3) {
      //   ratingDescription = 'Fair';
      // } else {
      //   ratingDescription = 'Poor';
      // }

      // let totalPrice = 0;
      // let subTotal = 0

      // dataAllBookingDetailExtraItems.forEach((data) => {
      //   let priceTotalConverse = parseFloat(data.borde_price.replace(/[^0-9.-]+/g, ''))
      //   let subTotalConverse = parseFloat(data.borde_subtotal.replace(/[^0-9.-]+/g, ''))

      //   totalPrice = totalPrice + priceTotalConverse
      //   subTotal = subTotal + subTotalConverse
      // })
      // console.log(subTotal)
      // subTotal = subTotal - totalBonusCoupons
      // subTotal = subTotal - bonusMember
      // subTotal = subTotal + bodePrice

      // const dataRes = {
      //   boor_id: dataAllBookingDetailExtraItems[0].border_boor_id,
      //   boor_border_hotel_book_name: dataAllBookingDetailExtraItems[0].facility.hotel.hotel_name,
      //   boor_border_rooms_address1: dataAllBookingDetailExtraItems[0].facility.hotel.address.addr_line1,
      //   boor_border_rooms_address_city: dataAllBookingDetailExtraItems[0].facility.hotel.address.city.city_name,
      //   boor_border_hotel_rating: ratingStar,
      //   boor_border_hotel_rating_length: total_reviews,
      //   boor_border_hotel_rating_status: ratingDescription,
      //   boor_border_hotel_checkin_checkout: `${dataAllBookingDetailExtraItems[0].borde_checkin} ${dataAllBookingDetailExtraItems[0].borde_checkout}`,
      //   boor_border_hotel_rooms_total_rooms: TotalRooms,
      //   boor_border_hotel_rooms_total_guest: TotalGuest,
      //   boor_border_rooms_name: dataAllBookingDetailExtraItems[0].facility.faci_name,
      //   boor_border_rooms_price: dataAllBookingDetailExtraItems[0].borde_price,
      //   boor_border_rooms_percent_discount: `${100 * Number(dataAllBookingDetailExtraItems[0].facility.faci_discount)}%`,
      //   boor_border_rooms_percent_tax: `${100 * Number(dataAllBookingDetailExtraItems[0].facility.faci_tax_rate)}%`,
      //   boor_border_rooms_price_total: totalPrice,
      //   boor_border_rooms_sub_total: subTotal,
      //   boor_border_rooms_bonus_member: bonusMember,
      //   boor_borde_room_bonus_coupons: totalBonusCoupons,
      //   boor_borde_room_bonus_extra_price_items: bodePrice
      // }
      return dataExtraItems;
    } catch (error) {
      return error;
    }
  }

  async getAllExtraItemsBooking() {
    try {
      const dataExtraItems = await this.priceItemsModel.findAll();

      const changeDataExtraItems = dataExtraItems.map((data: any) => {
        return {
          ...data.toJSON(),
          prit_price: Number(data.prit_price.replace(/[^0-9.-]+/g, '')),
        };
      });

      console.log(dataExtraItems);
      return changeDataExtraItems;
    } catch (error) {
      return error;
    }
  }

  async createBreakFeastBooking(BoorId: any, PickBreakFeast: any) {
    try {
      const dataOrderDetail = await this.bookingOrderDetailModel.findAll({
        where: {
          border_boor_id: BoorId,
        },
      });

      if (dataOrderDetail.length > 0) {
        const dataBreakFeast = await this.userBreakFeastModel.bulkCreate(
          [...PickBreakFeast],
          {
            fields: [
              'usbr_borde_id',
              'usbr_modified_date',
              'usbr_total_vacant',
            ],
          },
        );

        return dataBreakFeast;
      } else {
        return `Order Detail Anda Salah`;
      }
    } catch (error) {
      return error;
    }
  }

  async createFinalBookingOrderDetail(
    IdBorde: any,
    Pick: any[],
    bordeAll: any,
  ) {
    try {
      const dataHasilUpdate = [];
      const promises = Pick.map(async (data, index) => {
        const updatedBordeDetail = await this.bookingOrderDetailModel
          .update(
            {
              border_boor_id: data.border_boor_id,
              borde_checkin: data.borde_checkin,
              borde_checkout: data.borde_checkout,
              borde_adults: data.borde_adults,
              borde_kids: data.borde_kids,
              borde_price: data.borde_price,
              borde_extra: data.borde_extra,
              borde_discount: data.borde_discount,
              borde_tax: data.borde_tax,
              borde_subtotal: data.borde_subtotal,
              borde_faci_id: data.borde_faci_id,
            },
            {
              where: {
                borde_id: bordeAll[index],
                border_boor_id: IdBorde,
              },
            },
          )
          .catch((err) => {
            console.log(err);
          });
        const bordeDetail = await this.bookingOrderDetailModel.findOne({
          where: {
            borde_id: bordeAll[index],
          },
        });
        dataHasilUpdate.push(bordeDetail);
      });

      await Promise.all(promises);
      return dataHasilUpdate;
    } catch (error) {
      return error;
    }
  }

  updateUserMemberPointsBooking = async (
    userMemberId: any,
    userMemberName: any,
    dataUpdate: any,
  ) => {
    const [numRowsUpdated, updatedUserMember] = await user_members.update(
      {
        usme_points: dataUpdate.usme_points,
        usme_type: dataUpdate.usme_type,
      },
      {
        where: {
          usme_user_id: userMemberId,
          usme_memb_name: userMemberName,
        },
        returning: true, // return the updated row data
      },
    );

    return updatedUserMember;
  };

  createBookingOrderFinal = async (dataBooking: any, IdBoor: any) => {
    try {
      const dataBookingOrder = await this.bookingOrdersModel.update(
        {
          boor_arrival_date: dataBooking.boor_arrival_date,
          boor_total_room: dataBooking.boor_total_room,
          boor_total_guest: dataBooking.boor_total_guest,
          boor_discount: dataBooking.boor_discount,
          boor_total_tax: dataBooking.boor_total_tax,
          boor_total_amount: dataBooking.boor_total_amount,
          boor_down_payment: dataBooking.boor_down_payment,
          boor_pay_type: dataBooking.boor_pay_type,
          boor_is_paid: dataBooking.boor_is_paid,
          boor_type: dataBooking.boor_type,
          boor_cardnumber: dataBooking.boor_cardnumber,
          boor_member_type: dataBooking.boor_member_type,
          boor_status: dataBooking.boor_status,
          boor_user_id: dataBooking.boor_user_id,
          boor_order_date: dataBooking.boor_order_date,
        },
        {
          where: {
            boor_id: IdBoor,
          },
        },
      );

      const BookingOrderById = await this.bookingOrdersModel.findOne({
        where: {
          boor_id: IdBoor,
        },
      });

      return BookingOrderById;
    } catch (error) {
      return error;
    }
  };

  removeOrderBooking = async (IdBoor: any) => {
    try {
      const BookingOrderById = await this.bookingOrdersModel.destroy({
        where: {
          boor_id: IdBoor,
        },
      });

      return BookingOrderById;
    } catch (error) {
      return error;
    }
  };
}


  getBookingHistory = async (IdUser: any) => {
    try {
      const dataUserBooking: any = await this.sequelize.query(`
    
SELECT DISTINCT *
FROM users.users u
INNER JOIN payment.payment_transaction pt ON u.user_id = pt.patr_user_id
INNER JOIN booking.booking_orders bo ON bo.boor_order_number = pt.patr_boor_order_number inner join
booking.booking_order_detail bod on bo.boor_id = bod.border_boor_id inner join booking.special_offer_coupons soc on
soc.soco_borde_id = bod.borde_id inner join booking.special_offers so on soc.soco_spof_id = so.spof_id
inner join hotel.hotels h on bo.boor_hotel_id = h.hotel_id inner join hotel.facilities f on bod.borde_faci_id = f.faci_id
inner join hotel.facility_photos fps on fps.fapho_faci_id = f.faci_id
WHERE u.user_id = ${IdUser} AND pt.patr_trx_number NOT LIKE '%0001%' order by pt.patr_id desc;
      `)

      return dataUserBooking



    } catch (error) {
      return error
    }
  }

}
