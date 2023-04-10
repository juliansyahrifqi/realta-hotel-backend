import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  purchase_order_detail,
  purchase_order_header,
  vendor,
} from 'models/purchasingSchema';
import { Op, where } from 'sequelize';
import { CreatePurchaseOrderHeaderDto } from './dto/create-purchase-order-header.dto';
import { UpdatePurchaseOrderHeaderDto } from './dto/update-purchase-order-header.dto';
import { Response } from 'express';

@Injectable()
export class PurchaseOrderHeaderService {
  constructor(
    @InjectModel(purchase_order_header)
    private orderHeader: typeof purchase_order_header,
  ) {}

  create(createPurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto) {
    return 'This action adds a new purchaseOrderHeader';
  }

  // async searchAndPaginate(
  //   pageNumber: number,
  //   limit: number,
  //   pohe_number: string,
  //   pohe_status: string,
  // ): Promise<any> {
  //   try {
  //     const offset = (pageNumber - 1) * limit;

  //     const result = await this.orderHeader.findAndCountAll({
  //       where: {
  //         [Op.or]: [
  //           {
  //             pohe_number: {
  //               [Op.iLike]: `%${pohe_number}%`,
  //             },
  //           },
  //           {
  //             pohe_status: {
  //               [Op.eq]: pohe_status,
  //             },
  //           },
  //         ],
  //       },
  //       offset,
  //       limit,
  //     });
  //     const count = result.count;
  //     const totalPages = Math.ceil(count / limit);
  //     const currentPage = pageNumber;
  //     const data = result.rows;
  //     return {
  //       message: `Data ditemukan`,
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

  // async searchOrder(
  //   pageNumber: number,
  //   limit: number,
  //   poNumber: string,
  //   status: string,
  // ): Promise<any> {
  //   try {
  //     const offset = (pageNumber - 1) * limit;

  //     const result = await purchase_order_header.findAndCountAll({
  //       where: {
  //         [Op.or]: [
  //           {
  //             pohe_number: {
  //               [Op.iLike]: `%${poNumber}%`,
  //             },
  //           },
  //           {
  //             pohe_status: {
  //               [Op.eq]: status,
  //             },
  //           },
  //         ],
  //       },
  //       offset,
  //       limit,
  //     });

  //     const count = result.count;
  //     const totalPages = Math.ceil(count / limit);
  //     const currentPage = pageNumber;
  //     const data = result.rows;

  //     if (count === 0) {
  //       return {
  //         message: `Data order tidak ditemukan`,
  //         data: [],
  //         meta: {
  //           count: 0,
  //           totalPages: 0,
  //           currentPage,
  //           hasNextPage: false,
  //           hasPrevPage: false,
  //         },
  //       };
  //     }

  //     return {
  //       message: `Data order ditemukan`,
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

  // async findAll(pageNumber: number, limit: number): Promise<any> {
  //   try {
  //     const offset = (pageNumber - 1) * limit;

  //     const result = await purchase_order_header.findAndCountAll({
  //       offset,
  //       limit,
  //     });
  //     const count = result.count;
  //     const totalPages = Math.ceil(count / limit);
  //     const currentPage = pageNumber;
  //     const data = result.rows;
  //     return {
  //       message: `Data order ditemukan`,
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

  // async findAll(pageNumber: number, limit: number): Promise<any> {
  //   try {
  //     const offset = (pageNumber - 1) * limit;

  //     const result = await this.orderHeader.findAndCountAll({
  //       offset,
  //       limit,
  //     });
  //     const count = result.count;
  //     const totalPages = Math.ceil(count / limit);
  //     const currentPage = pageNumber;
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

  // // Search orderHeader
  // async searchPoOrder(pohe_number: string, pohe_status: string) {
  //   const result = await this.orderHeader.findAll({
  //     where: {
  //       [Op.or]: [
  //         {
  //           pohe_number: {
  //             [Op.iLike]: `%${pohe_number}%`,
  //           },
  //         },
  //         {
  //           pohe_status: {
  //             [Op.eq]: pohe_status,
  //           },
  //         },
  //       ],
  //     },
  //   });
  //   return result;
  // }

  // async findAll(pageNumber: number, limit: number) {
  //   try {
  //     const offset = (pageNumber - 1) * limit;

  //     const data = await this.orderHeader.findAll({
  //       offset,
  //       limit,
  //     });
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  async findOne(pode_pohe_id: number) {
    const result = await purchase_order_detail.findOne({
      where: { pode_pohe_id },
    });
    return result;
  }

  async update(
    pohe_id: number,
    updatePurchaseOrderHeaderDto: UpdatePurchaseOrderHeaderDto,
  ): Promise<any> {
    await purchase_order_header.update(updatePurchaseOrderHeaderDto, {
      where: { pohe_id },
    });
    return {
      message: `dengan id ${pohe_id} telah di update`,
      updatePurchaseOrderHeaderDto,
    };
  }

  async remove(pohe_id: number) {
    await purchase_order_header.destroy({ where: { pohe_id } });
    return {
      message: `Order dengan id ${pohe_id} berhasil di hapus`,
    };
  }
}
