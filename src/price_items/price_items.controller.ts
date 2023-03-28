import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PriceItemsService } from './price_items.service';
import { CreatePriceItemDto } from './dto/create-price_item.dto';
import { UpdatePriceItemDto } from './dto/update-price_item.dto';
import { price_items } from '../../models/master_module';

@Controller('price-items')
export class PriceItemsController {
  constructor(private readonly priceItemsService: PriceItemsService) {}

  @Post()
  async create(
    @Body() createPriceItemDto: CreatePriceItemDto,
  ): Promise<price_items> {
    return await this.priceItemsService.create(createPriceItemDto);
  }

  @Get()
  async findAll(): Promise<price_items[]> {
    return await this.priceItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<price_items> {
    return await this.priceItemsService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePriceItemDto: UpdatePriceItemDto,
  ): Promise<price_items> {
    return await this.priceItemsService.update(Number(id), updatePriceItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.priceItemsService.remove(Number(id));
  }
}
