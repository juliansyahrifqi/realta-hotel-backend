import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { order_menus } from '../../models/resto_module';
import { CreateOrderMenuDto } from './dto/create-order-menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order-menu.dto';

@Injectable()
export class OrderMenusService {
  constructor(
    @InjectModel(order_menus)
    private readonly orderMenusModel: typeof order_menus,
  ) {}

  async create(createOrderMenuDto: CreateOrderMenuDto): Promise<order_menus> {
    return this.orderMenusModel.create(createOrderMenuDto);
  }

  async findAll(): Promise<order_menus[]> {
    return this.orderMenusModel.findAll();
  }

  async findOne(id: number): Promise<order_menus> {
    return this.orderMenusModel.findByPk(id);
  }

  async update(
    id: number,
    updateOrderMenuDto: UpdateOrderMenuDto,
  ): Promise<order_menus> {
    const [affectedCount] = await this.orderMenusModel.update(
      updateOrderMenuDto,
      {
        where: { orme_id: id },
      },
    );
    if (affectedCount === 0) {
      return null;
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    const result = await this.orderMenusModel.destroy({
      where: { orme_id: id },
    });
    return result;
  }
}
