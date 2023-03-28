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
    const now = new Date();
    const newData = {
      ...createOrderMenuDto,
      orme_modified_date: now,
    };
    return this.orderMenusModel.create(newData);
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
  ): Promise<[number, order_menus[]]> {
    const orderMenusUpdate = await this.orderMenusModel.findByPk(id);

    if (!orderMenusUpdate) throw new Error(`Customer with id ${id} not found.`);

    const now = new Date();
    const newData = { ...updateOrderMenuDto, orme_modified_date: now };

    const [affectedCount, affectedRows] = await this.orderMenusModel.update(
      newData,
      {
        where: { orme_id: id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<number> {
    const result = await this.orderMenusModel.destroy({
      where: { orme_id: id },
    });
    return result;
  }
}
