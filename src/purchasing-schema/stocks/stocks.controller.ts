import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StocksService } from './stocks.service';

@Controller('purchasing/stock')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  //  dengan pagination
  @Get()
  async findAll(
    @Query('page') pageNumber: number,
    @Query('limit') limit: number,
    @Query('stock_name') stockName: string,
  ) {
    if (stockName) {
      return this.stocksService.findAllStock(pageNumber, limit, stockName);
    } else {
      return this.stocksService.findAll(pageNumber, limit);
    }
  }

  // Search Stock
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

  // Stock Detail

  @Get('/detail/:id')
  async findOne(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.stocksService.findStockDetail(page, limit, +id);
  }
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
}
