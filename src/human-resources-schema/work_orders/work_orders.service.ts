import { Body, Injectable } from '@nestjs/common';
import { CreateWorkOrderDto } from './dto/create-work_order.dto';
import { UpdateWorkOrderDto } from './dto/update-work_order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { work_orders } from '../../../models/humanResourcesSchema';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectModel(work_orders)
    private workOrdersModel: typeof work_orders,
  ) {}

  async create(
    @Body() createWorkOrderDto: CreateWorkOrderDto,
  ): Promise<work_orders> {
    const result = await this.workOrdersModel.create(createWorkOrderDto);
    return result;
  }

  async findAll(): Promise<work_orders[]> {
    const result = await this.workOrdersModel.findAll();
    return result;
  }

  async findOne(woro_id: number) {
    const result = await this.workOrdersModel.findByPk(woro_id);
    return result;
  }

  async update(
    woro_id: number,
    updateWorkOrderDto: UpdateWorkOrderDto,
  ): Promise<any> {
    await this.workOrdersModel.update(updateWorkOrderDto, {
      where: { woro_id },
    });
    return `Updated woro_id : ${woro_id} success`;
  }

  async remove(woro_id: number): Promise<any> {
    await this.workOrdersModel.destroy({
      where: { woro_id },
    });
    return `Deleted woro_id : ${woro_id} success`;
  }
}
