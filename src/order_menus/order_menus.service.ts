import { Injectable } from '@nestjs/common';
import { CreateOrderMenuDto } from './dto/create-order_menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order_menu.dto';

@Injectable()
export class OrderMenusService {
  create(createOrderMenuDto: CreateOrderMenuDto) {
    return 'This action adds a new orderMenu';
  }

  findAll() {
    return `This action returns all orderMenus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderMenu`;
  }

  update(id: number, updateOrderMenuDto: UpdateOrderMenuDto) {
    return `This action updates a #${id} orderMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderMenu`;
  }
}
