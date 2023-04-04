import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFintechDto } from './dto/create-fintech.dto';
import { UpdateFintechDto } from './dto/update-fintech.dto';
import { InjectModel } from '@nestjs/sequelize';
import { entity, fintech } from 'models/paymentSchema';
import { Op } from 'sequelize';

@Injectable()
export class FintechService {
  constructor(
    @InjectModel(fintech) private fintechModel: typeof fintech,
    @InjectModel(entity) private entityModel: typeof entity,
  ) {}

  async create(createBankDto: CreateFintechDto) {
    try {
      const entityId = await entity.create();
      const fintechs = await this.fintechModel.create({
        fint_entity_id: entityId.entity_id,
        fint_code: createBankDto.fint_code,
        fint_name: createBankDto.fint_name,
      });
      return fintechs;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(searchTerm?: string) {
    try {
      let cari = {};
      if (searchTerm) {
        cari = { fint_name: { [Op.iLike]: `%${searchTerm}%` } };
      }
      const fintechs = await this.fintechModel.findAll({ where: cari });
      return { data: fintechs };
    } catch (error) {
      return { error: 'Failed to get data Fintech' };
    }
  }

  async update(id: number, updateFintechDto: UpdateFintechDto): Promise<fintech> {
    try {
      const fintech = await this.fintechModel.findOne({
        where: { fint_entity_id: id },
      });
  
      if (!fintech) {
        throw new NotFoundException(`Fintech dengan ID ${id} tidak ditemukan`);
      }
      fintech.fint_code = updateFintechDto.fint_code;
      fintech.fint_name = updateFintechDto.fint_name;
      return await fintech.save();
    } catch (error) {
      throw new Error(`Gagal mengupdate data fintech dengan id ${id}: ${error.message}`);
    }
  }
  
  async delete(id: number) {
    try {
      const entity = await this.entityModel.findByPk(id);
      if (!entity) {
        return { error: 'Id fintech yang dimasukkan tidak ada' };
      }

      await entity.destroy();
      await this.fintechModel.destroy({ where: { fint_entity_id: id } });

      return { success: `Berhasil menghapus data fintech dengan id ${id}` };
    } catch (error) {
      return { error: 'Gagal menghapus data fintech' };
    }
  }
}
