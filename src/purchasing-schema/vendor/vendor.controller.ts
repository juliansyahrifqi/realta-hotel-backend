import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { vendor } from 'models/purchasingSchema';

@Controller('hr/purchasing/vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  //  dengan pagination
  // @Get()
  // async findAll(
  //   @Query('pageNumber') pageNumber = 1,
  //   @Query('pageSize') pageSize = 10,
  // ) {
  //   try {
  //     const vendorPage = await this.vendorService.findAll(pageNumber, pageSize);
  //     return {
  //       data: vendorPage,
  //       Halaman: pageNumber,
  //       JmlhData: pageSize,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       message: 'Internal server error',
  //     };
  //   }
  // }

  // @Get()
  // findAll() {
  //   return this.vendorService.findAll();
  // }

  // Search Vendor
  @Get()
  async searchVendor(
    @Query('page') pageNumber: number,
    @Query('limit') limit: number,
    @Query('name') vendor_name: string,
    @Query('priority') vendor_priority?: string,
  ) {
    if (vendor_name) {
      return this.vendorService.searchVendor(
        pageNumber,
        limit,
        vendor_name,
        vendor_priority,
      );
    } else if (vendor_priority) {
      return this.vendorService.searchVendor(
        pageNumber,
        limit,
        vendor_name,
        vendor_priority,
      );
    } else {
      return this.vendorService.findAll(pageNumber, limit);
    }
  }

  // ADD ITEM PRODUCT VENDOR

  @Get(':id/addProduct')
  async findOne(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.vendorService.findProductVendor(page, limit, +id);
  }

  // @Get(':id/addProduct')
  // findOne(@Param('id') id: string) {
  //   return this.vendorService.findProductVendor(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
