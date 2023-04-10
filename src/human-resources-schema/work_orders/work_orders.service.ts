import { Body, Injectable } from '@nestjs/common';
import { CreateWorkOrderDto } from './dto/create-work_order.dto';
import { UpdateWorkOrderDto } from './dto/update-work_order.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  work_order_detail,
  work_orders,
} from '../../../models/humanResourcesSchema';
import { users } from '../../../models/usersSchema/users';
import { Op } from 'sequelize';
import { service_task } from 'models/masterSchema';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectModel(work_orders)
    private workOrdersModel: typeof work_orders,
  ) {}

  async create(@Body() createWorkOrderDto: CreateWorkOrderDto): Promise<any> {
    try {
      const result = await this.workOrdersModel.create(createWorkOrderDto);
      return {
        message: 'Work Order Baru ditambahkan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(
    page: number,
    limit: number,
    from?: Date,
    to?: Date,
    woro_status?: string,
  ): Promise<any> {
    try {
      const offset = limit * (page - 1);
      const whereClause: any = {};

      if (woro_status) {
        whereClause.woro_status = woro_status;
      }

      if (from && to) {
        whereClause.woro_start_date = { [Op.between]: [from, to] };
      } else if (from) {
        whereClause.woro_start_date = { [Op.gte]: from };
      } else if (to) {
        whereClause.woro_start_date = { [Op.lte]: to };
      }

      const result = await this.workOrdersModel.findAll({
        attributes: ['woro_id', 'woro_start_date', 'woro_status'],
        include: [
          {
            model: users,
            attributes: ['user_full_name'],
            // required: true,
          },
          {
            model: work_order_detail,
            attributes: ['wode_id', 'wode_status', 'wode_notes'],
            // required: true,
            include: [
              {
                model: service_task,
                attributes: ['seta_name'],
                // required: true,
              },
            ],
          },
        ],
        where: whereClause,
        offset,
        limit,
      });

      const totalData = await this.workOrdersModel.count({
        where: whereClause,
      });
      const totalPages = Math.ceil(totalData / limit);

      if (!result) {
        return {
          message: 'Work Order tidak ditemukan!',
        };
      }

      return {
        message: 'Work Order ditemukan!',
        data: result,
        pagination: {
          totalData,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async update(
    woro_id: number,
    updateWorkOrderDto: UpdateWorkOrderDto,
  ): Promise<any> {
    try {
      const result = await this.workOrdersModel.update(updateWorkOrderDto, {
        where: { woro_id },
      });
      return {
        message: `Work order dengan id ${woro_id} berhasil diupdate!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(woro_id: number): Promise<any> {
    try {
      await this.workOrdersModel.destroy({
        where: { woro_id },
      });
      return {
        message: `Employee Department History dengan id ${woro_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
