import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateStockDetailDto } from './dto/create-stock-detail.dto';
import { UpdateStockDetailDto } from './dto/update-stock-detail.dto';
import { purchase_order_header, stock_detail } from 'models/purchasingSchema';
import { Response } from 'express';
import { facilities, hotels } from 'models/hotelSchema';
import { Model, Op } from 'sequelize';

@Injectable()
export class StockDetailService {
  async create(createStockDetailDto: CreateStockDetailDto) {
    const result = await stock_detail.findAll();
    return result;
  }

  // Stock detail GAK DIPAKE~ DISATUIN DI STOCK ALL

  async findStockDetail(
    @Res() response: Response,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const pages = pageNumber || 0;
      const limits = pageSize || 5;
      const offset = limits * (pages - 1);

      const totalRows = await facilities.count();

      const totalPage = Math.ceil(totalRows / limits);

      const data = await facilities.findAndCountAll({
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
        message: error.message || 'Something went wrong',
      };

      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  // Dengan pagination
  // async findAll(pageNumber = 1, pageSize = 2) {
  //   try {
  //     const offset = (pageNumber - 1) * pageSize;
  //     const limit = pageSize;

  //     const data = await stock_detail.findAll({
  //       offset,
  //       limit,
  //     });

  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async findOne(id: number) {
    const result = await stock_detail.findByPk(id);
    return result;
  }

  async update(stod_id: number, updateStockDetailDto: UpdateStockDetailDto) {
    await stock_detail.update(updateStockDetailDto, {
      where: { stod_id },
    });
    return {
      message: `Stock dengan id ${stod_id} berhasil diupdate`,
      data: updateStockDetailDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} stockDetail`;
  }
}
