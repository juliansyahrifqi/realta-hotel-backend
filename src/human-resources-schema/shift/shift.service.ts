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

  async create(@Body() createShiftDto: CreateShiftDto): Promise<shift> {
    const result = await this.shiftModel.create(createShiftDto);
    return result;
  }

  async findAll(): Promise<shift[]> {
    const result = await this.shiftModel.findAll();
    return result;
  }

  async findOne(shift_id: number) {
    const result = await this.shiftModel.findByPk(shift_id);
    return result;
  }

  async update(shift_id: number, updateShiftDto: UpdateShiftDto): Promise<any> {
    await this.shiftModel.update(updateShiftDto, {
      where: { shift_id },
    });
    return `shift_id ${shift_id} updated successfully`;
  }

  async remove(shift_id: number): Promise<any> {
    await this.shiftModel.destroy({
      where: { shift_id },
    });
    return `shift_id ${shift_id} deleted successfully`;
  }
}
