import { Injectable } from '@nestjs/common';
import { CreateVendorProductDto } from './dto/create-vendor-product.dto';
import { UpdateVendorProductDto } from './dto/update-vendor-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { vendor_product } from 'models/purchasingSchema';

@Injectable()
export class VendorProductService {
  constructor(
    @InjectModel(vendor_product)
    private vendorProductModel: typeof vendor_product,
  ) {}

  async create(createVendorProductDto: CreateVendorProductDto) {
    await vendor_product.create(createVendorProductDto);
    return {
      message: 'Product vendor berhasil di tambahkan',
      createVendorProductDto,
    };
  }

  // Dengan pagination ke-2
  // async findAll(page: number, limit: number): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;

  //     const result = await this.vendorProductModel.findAndCountAll({
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

  // Dengan pagination ke-1
  // async findAll(pageNumber = 1, pageSize = 2) {
  //   try {
  //     const offset = (pageNumber - 1) * pageSize;
  //     const limit = pageSize;

  //     const data = await vendor_product.findAll({
  //       offset,
  //       limit,
  //     });

  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} vendorProduct`;
  }

  async update(
    vepro_id: number,
    updateVendorProductDto: UpdateVendorProductDto,
  ) {
    await vendor_product.update(updateVendorProductDto, {
      where: { vepro_id },
    });
    return {
      message: `Product vendor dengan id ${vepro_id} berhasil di update`,
      updateVendorProductDto,
    };
  }

  async remove(vepro_id: number) {
    await vendor_product.destroy({ where: { vepro_id } });
    return {
      message: `Product vendor dengan id ${vepro_id} berhasil di hapus`,
    };
  }
}
