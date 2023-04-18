import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StocksService } from './stocks.service';
import { Response } from 'express';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  //  dengan pagination
  // @Get()
  // async findAll(
  //   @Query('page') pageNumber: number,
  //   @Query('limit') limit: number,
  //   @Query('stock_name') stockName: string,
  // ) {
  //   if (stockName) {
  //     return this.stocksService.findAllStock(pageNumber, limit, stockName);
  //   } else {
  //     return this.stocksService.findAll(pageNumber, limit);
  //   }
  // }

  @Get()
  async findDetail(
    @Res() response: Response,
    @Query('search') search: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const stock = await this.stocksService.stockDetail(
        response,
        search,
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

  // FindStockDetail

  @Get('detail/:id')
  async stockDet(
    // @Query('page') page = 1,
    // @Query('limit') limit = 5,
    @Param('id') id: number,
  ): Promise<any[]> {
    const result = await this.stocksService.findStockDetail(id);
    return result;
  }

  // All Stock
  // @Get(':name')
  // async searchVendor(@Param('name') stock_name: string) {
  //   const result = await this.stocksService.searchStock(stock_name);

  //   if (!result) {
  //     throw new NotFoundException(
  //       `Vendor dengan nama ${stock_name} tidak ditemukan`,
  //     );
  //   }
  //   return result;
  // }

  // @Get('/detail/:id')
  // findOne(@Param('id') id: string) {
  //   return this.stocksService.findStockDetail(+id);
  // }

  // @Get(':id/detail')
  // async findOne(
  //   @Param('id') id: string,
  //   @Query('page') page: number,
  //   @Query('limit') limit: number,
  // ) {
  //   return this.stocksService.findStockDetail(page, limit, +id);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.stocksService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }

  @Get('gallery')
  findAllGallery() {
    return this.stocksService.viewGallery();
  }

  @Get('prodvendor')
  findAllStock() {
    return this.stocksService.stockAll();
  }

  // VENDOR PRODUCT
  @Get('addproduct/:id')
  async getAllProd(@Param('id') id: any): Promise<any[]> {
    const result = await this.stocksService.vendorProdStock(id);
    return result;
  }
}
