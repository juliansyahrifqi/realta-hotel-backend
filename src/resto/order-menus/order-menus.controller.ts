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
import { order_menus } from 'models/restoSchema';
import { OrderMenusService } from './order-menus.service';
import { CreateOrderMenuDto } from './dto/create-order-menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order-menu.dto';

@Controller('order-menus')
export class OrderMenusController {
  constructor(private readonly orderMenusService: OrderMenusService) {}

  // * MENAMPILKAN DATA ORDER_MENUS BY ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<order_menus> {
    return this.orderMenusService.findOne(id);
  }
  // ! MENAMPILKAN DATA ORDER_MENUS BY ID

  // * MENAMPILKAN SEMUA DATA ORDER_MENUS
  @Get()
  async findAll(): Promise<order_menus[]> {
    return this.orderMenusService.findAll();
  }
  // ! MENAMPILKAN SEMUA DATA ORDER_MENUS

  @Post()
  async create(
    @Body() createOrderMenuDto: CreateOrderMenuDto,
  ): Promise<order_menus> {
    return this.orderMenusService.createOrderMenu(createOrderMenuDto);
  }

  // * EDIT DAN UPDATE DATA ORDER MENUS BY ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderMenuDto: UpdateOrderMenuDto,
  ): Promise<[number, order_menus[]]> {
    return this.orderMenusService.update(id, updateOrderMenuDto);
  }
  // ! EDIT DAN UPDATE DATA ORDER MENUS BY ID

  // * DELETE ORDER_MENUS BY ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.orderMenusService.remove(id);
  }
  // ! DELETE ORDER_MENUS BY ID
}
