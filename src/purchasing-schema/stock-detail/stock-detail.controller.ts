import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateStockDetailDto } from './dto/create-stock-detail.dto';
import { UpdateStockDetailDto } from './dto/update-stock-detail.dto';
import { StockDetailService } from './stock-detail.service';
import { Response } from 'express';

@Controller('stock-detail')
export class StockDetailController {
  constructor(private readonly stockDetailService: StockDetailService) {}

  @Post()
  create(@Body() createStockDetailDto: CreateStockDetailDto) {
    return this.stockDetailService.create(createStockDetailDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockDetailDto: UpdateStockDetailDto,
  ) {
    return this.stockDetailService.update(+id, updateStockDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockDetailService.remove(+id);
  }

  // Stock Detail ~ GAK DIPAKE JADI DI STOCK ALL ADANYA

  @Get('detailprod/:id')
  async findDetail(
    @Res() response: Response,
    // @Param('search') search: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const stock = await this.stockDetailService.findStockDetail(
        response,
        pageNumber,
        pageSize,
      );
      return stock;
    } catch (error) {
      return {
        message: 'Internal server error',
      };
    }
  }

  //  dengan pagination
  // @Get()
  // async findAll(
  //   @Query('pageNumber') pageNumber = 1,
  //   @Query('pageSize') pageSize = 2,
  // ) {
  //   try {
  //     const stockDetailPage = await this.stockDetailService.findAll(
  //       pageNumber,
  //       pageSize,
  //     );
  //     return {
  //       data: stockDetailPage,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockDetailService.findOne(+id);
  }
}

// spring bed ~ stock
// deskripsi ~ stock
// stocked 30 ~ stock
// reorder 30 ~ stock
// harga ~ vendorProduct
