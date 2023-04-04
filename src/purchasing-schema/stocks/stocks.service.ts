import { Injectable } from '@nestjs/common';
import {
  stock_detail,
  stock_photo,
  stocks,
  vendor_product,
} from 'models/purchasingSchema';
import { Op } from 'sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StocksService {
  async create(createStockDto: CreateStockDto) {
    await stocks.create(createStockDto);
    return { message: 'Stock berhasil di tambahkan', createStockDto };
  }

  // search stock
  async findAllStock(
    pageNumber: number,
    limit: number,
    stockName: string,
  ): Promise<any> {
    try {
      const offset = (pageNumber - 1) * limit;

      const result = await stocks.findAndCountAll({
        where: {
          [Op.or]: [
            {
              stock_name: {
                [Op.iLike]: `%${stockName}%`,
              },
            },
          ],
        },
        offset,
        limit,
      });

      const count = result.count;
      const totalPages = Math.ceil(count / limit);
      const currentPage = pageNumber;
      const data = result.rows;

      if (count === 0) {
        return {
          message: `Data stock tidak ditemukan`,
          data: [],
          meta: {
            count: 0,
            totalPages: 0,
            currentPage,
            hasNextPage: false,
            hasPrevPage: false,
          },
        };
      }

      return {
        message: `Data stock ditemukan`,
        data,
        meta: {
          count,
          totalPages,
          currentPage,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      };
    } catch (error) {
      return error;
    }
  }

  // GET ALL STOCK
  async findAll(pageNumber: number, limit: number): Promise<any> {
    try {
      const offset = (pageNumber - 1) * limit;

      const result = await stocks.findAndCountAll({
        offset,
        limit,
      });
      const count = result.count;
      const totalPages = Math.ceil(count / limit);
      const currentPage = pageNumber;
      const data = result.rows;
      return {
        message: `Data stock ditemukan`,
        data,
        meta: {
          count,
          totalPages,
          currentPage,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      };
    } catch (error) {
      return error;
    }
  }

  // Dengan pagination
  // async findAll(pageNumber = 1, pageSize = 10) {
  //   try {
  //     const offset = (pageNumber - 1) * pageSize;
  //     const limit = pageSize;

  //     const data = await stocks.findAll({
  //       offset,
  //       limit,
  //     });

  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // search stock
  // async searchStock(stock_name: string) {
  //   const result = await stocks.findAll({
  //     where: {
  //       [Op.or]: [
  //         {
  //           stock_name: {
  //             [Op.iLike]: `%${stock_name}%`,
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return result;
  // }

  // Stock detail

  async findStockDetail(page: number, limit: number, id: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await stock_detail.findAndCountAll({
        where: { stod_stock_id: id },
        offset,
        limit,
      });

      const count = result.count;
      const totalPages = Math.ceil(count / limit);
      const currentPage = page;
      const data = result.rows;

      return {
        message: `Data di temukan`,
        data,
        meta: {
          count,
          totalPages,
          currentPage,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      };
    } catch (error) {
      return error;
    }
  }

  // async findStockDetail(stod_stock_id: number): Promise<any> {
  //   try {
  //     const result = await stock_detail.findAll({ where: { stod_stock_id } });
  //     return { message: `Data di temukan`, data: result };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async findStockDetail(page: number, limit: number, id: number): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;

  //     const result = await stock_detail.findAndCountAll({
  //       where: { stod_id: id },
  //       offset,
  //       limit,
  //     });

  //     const count = result.count;
  //     const totalPages = Math.ceil(count / limit);
  //     const currentPage = page;
  //     const data = result.rows;

  //     return {
  //       message: `Data berhasil ditemukan`,
  //       data,
  //       meta: {
  //         count,
  //         totalPages,
  //         currentPage,
  //         hasNextPage: currentPage < totalPages,
  //         hasPrevPage: currentPage > 1,
  //       },
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async findOne(id: number) {
  //   const result = await stock_detail.findByPk(id);
  //   return result;
  // }

  async update(stock_id: number, updateStockDto: UpdateStockDto) {
    await stocks.update(updateStockDto, {
      where: { stock_id },
    });
    return {
      message: `Stock dengan id ${stock_id} berhasil di update`,
      updateStockDto,
    };
  }

  async remove(stock_id: number) {
    await stocks.destroy({ where: { stock_id } });
    return {
      message: `Stock dengan id ${stock_id} berhasil di hapus`,
    };
  }

  async viewGallery(): Promise<any> {
    try {
      const result = await stock_photo.findAll({
        attributes: ['spho_photo_filename'],
        include: [
          {
            model: stocks,
            attributes: [
              'stock_name',
              'stock_description',
              'stock_reorder_point',
            ],
            include: [
              {
                model: vendor_product,
                attributes: ['vepro_qty_stocked', 'vepro_price'],
              },
            ],
          },
        ],
      });
      return { message: `Data di temukan`, data: result };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
