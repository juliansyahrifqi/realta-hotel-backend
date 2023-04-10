import { Injectable } from '@nestjs/common';
import { CreateStockDetailDto } from './dto/create-stock-detail.dto';
import { UpdateStockDetailDto } from './dto/update-stock-detail.dto';
import { stock_detail } from 'models/purchasingSchema';

@Injectable()
export class StockDetailService {
  async create(createStockDetailDto: CreateStockDetailDto) {
    const result = await stock_detail.findAll();
    return result;
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
      message: `Stock dengan id ${stod_id} berhasil di update`,
      updateStockDetailDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} stockDetail`;
  }
}
