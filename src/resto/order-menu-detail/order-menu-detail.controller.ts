import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { order_menu_detail } from 'models/restoSchema';
import { OrderMenuDetailService } from './order-menu-detail.service';
import { CreateOrderMenuDetailDto } from './dto/create-order-menu-detail.dto';
import { UpdateOrderMenuDetailDto } from './dto/update-order-menu-detail.dto';

@Controller('order-menu-details')
export class OrderMenuDetailController {
  constructor(
    private readonly orderMenuDetailService: OrderMenuDetailService,
  ) {}

  // *MENAMPILKAN SEMUA DATA ORDER_MENU_DETAIL
  @Get()
  async findAll(): Promise<order_menu_detail[]> {
    return this.orderMenuDetailService.findAll();
  }
  // !MENAMPILKAN SEMUA DATA ORDER_MENU_DETAIL

  // *CREATE DATA ORDER_MENU_DETAIL
  @Post()
  async create(
    @Body()
    createOrderMenuDetailDto:
      | CreateOrderMenuDetailDto
      | CreateOrderMenuDetailDto[],
  ): Promise<order_menu_detail | order_menu_detail[]> {
    return this.orderMenuDetailService.create(createOrderMenuDetailDto);
  }
  // !CREATE DATA ORDER_MENU_DETAIL

  // * MENAMPILKAN DATA BY ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<order_menu_detail> {
    const orderMenuDetail = await this.orderMenuDetailService.findOne(id);
    if (!orderMenuDetail) {
      throw new NotFoundException(`Order menu detail with ID ${id} not found`);
    }
    return orderMenuDetail;
  }
  // ! MENAMPILKAN DATA BY ID

  // * EDIT DAN UPDATE DATA BY ID
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderMenuDetailDto: UpdateOrderMenuDetailDto,
  ): Promise<order_menu_detail> {
    const updatedOrderMenuDetail = await this.orderMenuDetailService.update(
      id,
      updateOrderMenuDetailDto,
    );
    if (!updatedOrderMenuDetail) {
      throw new NotFoundException(`Order menu detail with ID ${id} not found`);
    }
    return updatedOrderMenuDetail;
  }
  // ! EDIT DAN UPDATE DATA BY ID

  // * HAPUS DATA BY ID
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.orderMenuDetailService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Order menu detail with ID ${id} not found`);
    }
  }
  // ! HAPUS DATA BY ID
}
