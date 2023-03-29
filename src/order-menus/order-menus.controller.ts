import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { order_menus } from '../../models/restoSchema';
import { OrderMenusService } from './order-menus.service';
import { CreateOrderMenuDto } from './dto/create-order-menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order-menu.dto';

@Controller('order-menus')
export class OrderMenusController {
  constructor(private readonly orderMenusService: OrderMenusService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<order_menus> {
    return this.orderMenusService.findOne(id);
  }

  @Get()
  async findAll(): Promise<order_menus[]> {
    return this.orderMenusService.findAll();
  }

  @Post()
  async create(
    @Body() createOrderMenuDto: CreateOrderMenuDto,
  ): Promise<order_menus> {
    return this.orderMenusService.create(createOrderMenuDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderMenuDto: UpdateOrderMenuDto,
  ): Promise<[number, order_menus[]]> {
    return this.orderMenusService.update(id, updateOrderMenuDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.orderMenusService.remove(id);
  }
}
