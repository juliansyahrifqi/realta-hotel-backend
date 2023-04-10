import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import {
  purchase_order_header,
  stocks,
  vendor,
  vendor_product,
} from 'models/purchasingSchema';
import { Op } from 'sequelize';

@Injectable()
export class VendorService {
  constructor(@InjectModel(vendor) private vendorModel: typeof vendor) {}

  async create(createVendorDto: CreateVendorDto) {
    await vendor.create(createVendorDto);
    return { message: 'Vendor berhasil di tambahkan', createVendorDto };
  }

  async findOne(vendor_entity_id: number): Promise<any> {
    try {
      const result = await vendor.findOne({ where: { vendor_entity_id } });
      if (result) {
        return {
          message: `Data dengan id ${vendor_entity_id} berhasil ditemukan`,
          data: result,
        };
      } else {
        return {
          message: `Data dengan id ${vendor_entity_id} tidak ditemukan`,
          data: result,
        };
      }
    } catch (error) {
      return error;
    }
  }

  // async findAll() {
  //   const result = await vendor.findAll();
  //   return result;
  // }

  // Dengan pagination
  // async findAll(pageNumber = 1, pageSize = 10) {
  //   try {
  //     const offset = (pageNumber - 1) * pageSize;
  //     const limit = pageSize;

  //     const data = await vendor.findAll({
  //       offset,
  //       limit,
  //     });

  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // Search Vendor
  // async searchVendor(vendor_name: string) {
  //   const result = await vendor.findAll({
  //     where: {
  //       vendor_name: {
  //         [Op.iLike]: `%${vendor_name}%`,
  //       },
  //       // vendor_priority: vendor_priority,
  //     },
  //   });
  //   return result;
  // }

  // search vendor
  // async searchAllVendor(
  //   pageNumber: number,
  //   limit: number,
  //   vendor_name: string,
  //   vendor_priority: string,
  // ): Promise<any> {
  //   try {
  //     const offset = (pageNumber - 1) * limit;

  //     const result = await vendor.findAndCountAll({
  //       where: {
  //         [Op.or]: [
  //           {
  //             vendor_name: {
  //               [Op.iLike]: `%${vendor_name}%`,
  //             },
  //           },
  //           {
  //             vendor_priority: {
  //               [Op.eq]: vendor_priority,
  //             },
  //           },
  //         ],
  //       },
  //       offset,
  //       limit,
  //       order: [['vendor_entity_id', 'ASC']],
  //     });

  //     const count = result.count;
  //     const totalPages = Math.ceil(vendor.length / limit);
  //     const currentPage = pageNumber;
  //     const data = result.rows;

  //     if (count === 0) {
  //       return {
  //         message: `Data vendor tidak ditemukan`,
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
  //       message: `Data vendor ditemukan`,
  //       data: result,
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

  //     const result = await this.vendorModel.findAndCountAll({
  //       offset,
  //       limit,
  //       order: [['vendor_entity_id', 'ASC']],
  //       include: [
  //         {
  //           model: vendor_product,
  //         },
  //       ],
  //     });
  //     const count = result.count;
  //     const totalPages = Math.ceil(vendor.length / limit);
  //     const currentPage = pageNumber;
  //     const data = result.rows;

  //     if (count === 0) {
  //       return {
  //         message: `Data vendor kosong`,
  //         data: result,
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
  //       message: `Data vendor ditemukan`,
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

  async findAll(
    @Res() response: Response,
    vendor_name: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const pages = pageNumber || 0;
      const limits = pageSize || 5;
      const search = vendor_name || '';
      const offset = limits * (pages - 1);

      const totalRows = await this.vendorModel.count({
        where: {
          [Op.or]: [
            {
              vendor_name: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(vendor.length / limits);

      const data = await this.vendorModel.findAll({
        where: {
          vendor_name: {
            [Op.iLike]: '%' + search + '%',
          },
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
        offset: offset,
        limit: limits,
        order: [['vendor_entity_id', 'ASC']],
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

  // GET ITEM VENDOR PRODUCT

  async findProductVendor(
    page: number,
    limit: number,
    id: number,
  ): Promise<any> {
    try {
      const offset = (page - 1) * limit;

      const result = await vendor_product.findAndCountAll({
        where: { vepro_vendor_id: id },
        offset,
        limit,
      });

      const count = result.count;
      const totalPages = Math.ceil(count / limit);
      const currentPage = page;
      const data = result.rows;

      if (count === 0) {
        return {
          message: `Produk vendor tidak ditemukan`,
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
        message: `Produk vendor berhasil ditemukan`,
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

  // LISTORDER
  async findAllOrder(
    @Res() response: Response,
    po_number: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any> {
    try {
      const pages = pageNumber || 0;
      const limits = pageSize || 5;
      const search = po_number || '';
      const offset = limits * (pages - 1);

      const totalRows = await purchase_order_header.count({
        include: [
          {
            model: vendor,
          },
        ],
        where: {
          [Op.or]: [
            {
              pohe_number: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);

      const data = await purchase_order_header.findAll({
        include: [
          {
            model: vendor,
          },
        ],
        where: {
          pohe_number: {
            [Op.iLike]: '%' + search + '%',
          },
        },
        offset: offset,
        limit: limits,
        order: [['pohe_id', 'ASC']],
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

  // async findProductVendor(id: number) {
  //   const result = await vendor_product.findAll({
  //     where: {
  //       vepro_vendor_id: id,
  //     },
  //   });
  //   return result;
  // }

  async update(
    vendor_entity_id: number,
    updateVendorDto: UpdateVendorDto,
  ): Promise<any> {
    await vendor.update(updateVendorDto, {
      where: { vendor_entity_id },
    });
    return {
      message: `Vendor dengan id ${vendor_entity_id} berhasil di update`,
      updateVendorDto,
    };
  }

  async remove(vendor_entity_id: number) {
    await vendor.destroy({ where: { vendor_entity_id } });
    return {
      message: `Vendor dengan id ${vendor_entity_id} berhasil di hapus`,
    };
  }
}
