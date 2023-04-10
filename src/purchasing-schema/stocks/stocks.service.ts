import { HttpStatus, Injectable, Res } from '@nestjs/common';
import {
  purchase_order_header,
  stock_detail,
  stock_photo,
  stocks,
  vendor,
  vendor_product,
} from 'models/purchasingSchema';
import { Op } from 'sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { facilities, hotels } from 'models/hotelSchema';
import { Response } from 'express';

@Injectable()
export class StocksService {
  async create(createStockDto: CreateStockDto) {
    try {
      console.log(createStockDto);
      await stocks.create(createStockDto);

      return { message: 'Stock berhasil di tambahkan', createStockDto };
    } catch (e) {
      return e;
    }
  }

  // STOCK DAN STOCK DETAIL

  async stockDetail(
    @Res() response: Response,
    searching: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const pages = pageNumber || 0;
      const limits = pageSize || 5;
      const search = searching || '';
      const offset = limits * (pages - 1);

      const totalRows = await stocks.count({
        where: {
          [Op.or]: [
            {
              stock_name: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const data = await stocks.findAll({
        where: {
          [Op.or]: [
            {
              stock_name: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
        include: [
          {
            model: stock_detail,
            include: [
              {
                model: purchase_order_header,
              },
            ],
          },
        ],
        offset: offset,
        limit: limits,
      });
      const dataResponse = {
        statusCode: HttpStatus.OK,
        totalPage: totalPage,
        totalRows: totalRows,
        page: pages,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
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

      if (count === 0) {
        return {
          message: `Data stock kosong`,
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

  // async findStockDetail(page: number, limit: number, id: number): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;
  //     const result = await stock_detail.findAndCountAll({
  //       where: { stod_stock_id: id },
  //       offset,
  //       limit,
  //     });

  //     const count = result.count;
  //     const totalPages = Math.ceil(count / limit);
  //     const currentPage = page;
  //     const data = result.rows;

  //     return {
  //       message: `Data di temukan`,
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

  async stockAll() {
    try {
      const result = await stocks.findAll();
      return { message: `Data di temukan`, data: result };
    } catch (error) {
      return error;
    }
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

  // GET VENDOR PRODUCT
  async vendorProdStock(id: number): Promise<any> {
    try {
      const result = await vendor.findAndCountAll({
        where: {
          vendor_entity_id: id,
        },
        include: [
          {
            model: vendor_product,
            include: [
              {
                model: stocks,
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
