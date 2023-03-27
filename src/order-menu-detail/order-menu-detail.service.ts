import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { order_menu_detail } from '../../models/resto_module';
import { CreateOrderMenuDetailDto } from './dto/create-order-menu-detail.dto';
import { UpdateOrderMenuDetailDto } from './dto/update-order-menu-detail.dto';

@Injectable()
export class OrderMenuDetailService {
  constructor(
    @InjectModel(order_menu_detail)
    private orderMenuDetailModel: typeof order_menu_detail,
  ) {}

  async create(
    createOrderMenuDetailDto: CreateOrderMenuDetailDto,
  ): Promise<order_menu_detail> {
    return this.orderMenuDetailModel.create(createOrderMenuDetailDto);
  }

  async findAll(): Promise<order_menu_detail[]> {
    return this.orderMenuDetailModel.findAll({
      include: ['order_menus', 'resto_menus'],
    });
  }

  async findOne(id: number): Promise<order_menu_detail> {
    return this.orderMenuDetailModel.findByPk(id);
  }

  async update(
    id: number,
    updateOrderMenuDetailDto: UpdateOrderMenuDetailDto,
  ): Promise<order_menu_detail> {
    const [affectedCount] = await this.orderMenuDetailModel.update(
      updateOrderMenuDetailDto,
      {
        where: { omde_id: id },
      },
    );
    if (affectedCount === 0) {
      return null;
    }
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await this.orderMenuDetailModel.destroy({
      where: { omde_id: id },
    });
    return affectedRows > 0;
  }
}
