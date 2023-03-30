import { Body, Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectModel } from '@nestjs/sequelize';
import { shift } from '../../../models/humanResourcesSchema';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(shift)
    private shiftModel: typeof shift,
  ) {}

  async create(@Body() createShiftDto: CreateShiftDto): Promise<any> {
    try {
      const result = await this.shiftModel.create(createShiftDto);
      return {
        message: 'Departement Baru ditambahkan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.shiftModel.findAll();
      if (result.length === 0) {
        return {
          message: 'Data department tidak ditemukan!',
        };
      }
      return {
        message: 'Departement ditemukan!',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(shift_id: number) {
    try {
      const result = await this.shiftModel.findByPk(shift_id);
      if (!result) {
        return {
          message: `Shift dengan id ${shift_id} tidak ditemukan!`,
        };
      }
      return {
        message: `Shift dengan id ${shift_id} ditemukan!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async update(shift_id: number, updateShiftDto: UpdateShiftDto): Promise<any> {
    try {
      const result = await this.shiftModel.update(updateShiftDto, {
        where: { shift_id },
      });
      return {
        message: `Shift dengan id ${shift_id} berhasil diupdate!`,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(shift_id: number): Promise<any> {
    try {
      await this.shiftModel.destroy({
        where: { shift_id },
      });
      return {
        message: `Employee Department History dengan id ${shift_id} berhasil dihapus!`,
      };
    } catch (error) {
      return error;
    }
  }
}
