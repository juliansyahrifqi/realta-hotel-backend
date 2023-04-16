import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { order_menus } from 'models/restoSchema';
import { CreateOrderMenuDto } from './dto/create-order-menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order-menu.dto';

@Injectable()
export class OrderMenusService {
  constructor(
    @InjectModel(order_menus)
    private readonly orderMenusModel: typeof order_menus,
  ) {}

  // *  MEMBUAT ORME_ORDER_MENUS OTOMATIS DENGAN FORMAT YANG SUDAH DITENTUKAN

  async createOrderMenu(
    orderMenuDto: CreateOrderMenuDto,
  ): Promise<order_menus> {
    const now = new Date();
    const dateString = now.toISOString().slice(0, 10).replace(/-/g, '');
    const orderNumber = `MENUS#${dateString}-`;

    const lastOrder = await this.orderMenusModel.findOne({
      order: [['orme_order_number', 'DESC']],
    });

    let serialNumber = 1;
    if (lastOrder) {
      const lastOrderSerialNumber = lastOrder.orme_order_number.split('-')[1];
      serialNumber = parseInt(lastOrderSerialNumber) + 1;
    }

    const newOrderNumber = `${orderNumber}${serialNumber
      .toString()
      .padStart(4, '0')}`;

    const orderMenu = new order_menus();
    orderMenu.orme_order_number = newOrderNumber;
    orderMenu.orme_order_date = now;
    orderMenu.orme_total_item = orderMenuDto.orme_total_item;
    orderMenu.orme_total_discount = orderMenuDto.orme_total_discount;
    orderMenu.orme_total_amount = orderMenuDto.orme_total_amount;
    orderMenu.orme_pay_type = orderMenuDto.orme_pay_type;
    orderMenu.orme_cardnumber = orderMenuDto.orme_cardnumber;
    orderMenu.orme_is_paid = orderMenuDto.orme_is_paid;
    orderMenu.orme_modified_date = now;

    return orderMenu.save();
  }
  // !  MEMBUAT ORME_ORDER_MENUS OTOMATIS DENGAN FORMAT YANG SUDAH DITENTUKAN

  // * MEMBAWA DATA USER ATAU HUBUNGAN DENGAN USER
  async findAll(): Promise<order_menus[]> {
    return this.orderMenusModel.findAll({
      include: ['user', 'order_menu_details'],
    });
  }
  // ! MEMBAWA DATA USER ATAU HUBUNGAN DENGAN USER

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
    const newData = {
      ...updateOrderMenuDto,
      orme_modified_date: now,
      orme_order_date: now,
    };

    const [affectedCount, affectedRows] = await this.orderMenusModel.update(
      newData,
      {
        where: { orme_id: id },
        returning: true,
      },
    );

    const updatedOrderMenu = await this.orderMenusModel.findByPk(id, {
      order: [['orme_id', 'ASC']], // tambahkan kondisi pengurutan berdasarkan orme_id ascending
    });

    return [affectedCount, [updatedOrderMenu]];
  }

  async remove(id: number): Promise<number> {
    const result = await this.orderMenusModel.destroy({
      where: { orme_id: id },
    });
    return result;
  }
}
