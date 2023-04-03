import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { purchase_order_detail } from 'models/purchasingSchema';

@Injectable()
export class PurchaseOrderDetailService {
  create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return 'This action adds a new purchaseOrderDetail';
  }

  async findAll() {
    try {
      const result = await purchase_order_detail.findAll();
      return { message: `Data di temukan`, data: result };
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseOrderDetail`;
  }

  async update(
    pode_id: number,
    updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto,
  ) {
    await purchase_order_detail.update(updatePurchaseOrderDetailDto, {
      where: { pode_id },
    });
    return {
      message: `Order dengan id ${pode_id} berhasil di update`,
      updatePurchaseOrderDetailDto,
    };
  }

  async remove(pode_id: number) {
    await purchase_order_detail.destroy({ where: { pode_id } });
    return {
      message: `Order dengan id ${pode_id} berhasil di hapus`,
    };
  }
}
