import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderMenusService } from './order_menus.service';
import { CreateOrderMenuDto } from './dto/create-order_menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order_menu.dto';

@Controller('order-menus')
export class OrderMenusController {
  constructor(private readonly orderMenusService: OrderMenusService) {}

  @Post()
  create(@Body() createOrderMenuDto: CreateOrderMenuDto) {
    return this.orderMenusService.create(createOrderMenuDto);
  }

  @Get()
  findAll() {
    return this.orderMenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderMenusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderMenuDto: UpdateOrderMenuDto) {
    return this.orderMenusService.update(+id, updateOrderMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderMenusService.remove(+id);
  }
}
