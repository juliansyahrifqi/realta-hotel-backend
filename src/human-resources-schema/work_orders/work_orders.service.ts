import { Body, Injectable } from '@nestjs/common';
import { CreateWorkOrderDto } from './dto/create-work_order.dto';
import { UpdateWorkOrderDto } from './dto/update-work_order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { work_orders } from '../../../models/humanResourcesSchema';
import { users } from '../../../models/usersSchema/users';
import { Op } from 'sequelize';

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

  async findAll(page: number, limit: number): Promise<any> {
    try {
      const offset = limit * (page - 1);
      const result = await this.workOrdersModel.findAll({
        attributes: ['woro_start_date', 'woro_status'],
        include: [
          {
            model: users,
            attributes: ['user_full_name'],
          },
        ],
        offset,
        limit,
      });
      const totalData = await this.workOrdersModel.count();
      const totalPages = Math.ceil(totalData / limit);
      if (result.length === 0) {
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

  async findOne(woro_start_date: Date, from: Date, to: Date, status: string) {
    try {
      // eslint-disable-next-line prefer-const
      let where: any = {};
      if (status) {
        where.woro_status = status;
      }
      if (from && to) {
        where.woro_start_date = { [Op.between]: [from, to] };
      } else if (from) {
        where.woro_start_date = { [Op.gte]: from };
      } else if (to) {
        where.woro_start_date = { [Op.lte]: to };
      }
      const result = await this.workOrdersModel.findAll({ where });
      if (!result) {
        return {
          message: `Tidak ada work order yang ditemukan pada tanggal ${woro_start_date} dan dalam rentang waktu dari ${from} hingga ${to} dengan status ${status}!`,
        };
      }
      return {
        message: `Ditemukan ${result.length} work order pada tanggal ${woro_start_date} dan dalam rentang waktu dari ${from} hingga ${to} dengan status ${status}.`,
        data: result,
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
