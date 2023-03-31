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

  @Get()
  async findAll(): Promise<order_menu_detail[]> {
    return this.orderMenuDetailService.findAll();
  }

  @Post()
  async create(
    @Body() createOrderMenuDetailDto: CreateOrderMenuDetailDto,
  ): Promise<order_menu_detail> {
    return this.orderMenuDetailService.create(createOrderMenuDetailDto);
  }

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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.orderMenuDetailService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Order menu detail with ID ${id} not found`);
    }
  }
}
