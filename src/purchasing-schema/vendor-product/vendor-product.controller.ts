import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VendorProductService } from './vendor-product.service';
import { CreateVendorProductDto } from './dto/create-vendor-product.dto';
import { UpdateVendorProductDto } from './dto/update-vendor-product.dto';

@Controller('vendor-product')
export class VendorProductController {
  constructor(private readonly vendorProductService: VendorProductService) {}

  @Post()
  create(@Body() createVendorProductDto: CreateVendorProductDto) {
    return this.vendorProductService.create(createVendorProductDto);
  }

  // dengan pagination ke-2
  // @Get()
  // async findAll(@Query('page') page: number, @Query('limit') limit: number) {
  //   return this.vendorProductService.findAll(page, limit);
  // }

  //  dengan pagination ke-1
  // @Get()
  // async findAll(
  //   @Query('pageNumber') pageNumber = 1,
  //   @Query('pageSize') pageSize = 2,
  // ) {
  //   try {
  //     const vendorPage = await this.vendorProductService.findAll(
  //       pageNumber,
  //       pageSize,
  //     );
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vendorProductService.findOne(+id);
  // }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVendorProductDto: UpdateVendorProductDto,
  ) {
    return this.vendorProductService.update(+id, updateVendorProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorProductService.remove(+id);
  }
}
