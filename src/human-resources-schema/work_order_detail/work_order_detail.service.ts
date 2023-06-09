import { Body, Injectable } from '@nestjs/common';
import { CreateWorkOrderDetailDto } from './dto/create-work_order_detail.dto';
import { UpdateWorkOrderDetailDto } from './dto/update-work_order_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  work_order_detail,
  work_orders,
} from '../../../models/humanResourcesSchema';
import { Op } from 'sequelize';
import { users } from '../../../models/usersSchema';
import { service_task } from 'models/masterSchema';

@Injectable()
export class WorkOrderDetailService {
  constructor(
    @InjectModel(work_order_detail)
    private workOrderDetailModel: typeof work_order_detail,
  ) {}

  async create(
    @Body() createWorkOrderDetailDto: CreateWorkOrderDetailDto,
  ): Promise<any> {
    try {
      const result = await this.workOrderDetailModel.create(
        createWorkOrderDetailDto,
      );
      return {
        message: 'Work order detail Baru ditambahkan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.workOrderDetailModel.findAll({
        attributes: ['wode_id', 'wode_notes', 'wode_status'],
        include: [
          {
            model: service_task,
            attributes: ['seta_name'],
          },
          {
            model: work_orders,
            attributes: ['woro_id'],
            include: [
              {
                model: users,
                attributes: ['user_full_name'],
              },
            ],
          },
        ],
      });
      if (result.length === 0) {
        return {
          message: 'Work order detail tidak ditemukan!',
        };
      }
      return {
        message: 'Work order detail ditemukan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  // by tanggal

  async findOne(wode_start_date: Date) {
    try {
      const result = await this.workOrderDetailModel.findOne({
        where: { wode_start_date },
      });
      if (!result) {
        return {
          message: `Work order dengan tanggal ${wode_start_date} tidak ditemukan!`,
        };
      }
      return {
        message: `Work order dengan tanggal ${wode_start_date} ditemukan!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async update(
    wode_id: number,
    updateWorkOrderDetailDto: UpdateWorkOrderDetailDto,
  ): Promise<any> {
    try {
      const result = await this.workOrderDetailModel.update(
        updateWorkOrderDetailDto,
        {
          where: { wode_id },
        },
      );
      return {
        message: `work order detail dengan id ${wode_id} berhasil diupdate!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(wode_id: number): Promise<any> {
    try {
      await this.workOrderDetailModel.destroy({
        where: { wode_id },
      });
      return {
        message: `work order detail dengan id ${wode_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
