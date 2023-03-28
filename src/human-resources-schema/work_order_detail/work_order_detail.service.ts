import { Body, Injectable } from '@nestjs/common';
import { CreateWorkOrderDetailDto } from './dto/create-work_order_detail.dto';
import { UpdateWorkOrderDetailDto } from './dto/update-work_order_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { work_order_detail } from '../../../models/humanResourcesSchema';

@Injectable()
export class WorkOrderDetailService {
  constructor(
    @InjectModel(work_order_detail)
    private workOrderDetailModel: typeof work_order_detail,
  ) {}

  async create(
    @Body() createWorkOrderDetailDto: CreateWorkOrderDetailDto,
  ): Promise<work_order_detail> {
    const result = await this.workOrderDetailModel.create(
      createWorkOrderDetailDto,
    );
    return result;
  }

  async findAll(): Promise<work_order_detail[]> {
    const result = await this.workOrderDetailModel.findAll();
    return result;
  }

  async findOne(wode_id: number) {
    const result = await this.workOrderDetailModel.findByPk(wode_id);
    return result;
  }

  async update(
    wode_id: number,
    updateWorkOrderDetailDto: UpdateWorkOrderDetailDto,
  ): Promise<any> {
    await this.workOrderDetailModel.update(updateWorkOrderDetailDto, {
      where: { wode_id },
    });
    return `Updated wode_id : ${wode_id} success`;
  }

  async remove(wode_id: number): Promise<any> {
    await this.workOrderDetailModel.destroy({
      where: { wode_id },
    });
    return `Deleted wode_id : ${wode_id} success`;
  }
}
