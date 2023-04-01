import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { bank, entity } from '../../models/paymentSchema';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(bank) private bankModel: typeof bank,
    @InjectModel(entity) private entityModel: typeof entity,
  ) {}

  async create(createBankDto: CreateBankDto) {
    try {
      const entityId = await entity.create();
      const bank = await this.bankModel.create({
        bank_entity_id: entityId.entity_id,
        bank_code: createBankDto.bank_code,
        bank_name: createBankDto.bank_name,
      });
      return bank;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(searchTerm?: string) {
    try {
      let cari = {};
      if (searchTerm) {
        cari = { bank_name: { [Op.iLike]: `%${searchTerm}%` } };
      }
      const banks = await this.bankModel.findAll({ where: cari });
      return { data: banks };
    } catch (error) {
      return { error: 'Failed to get banks' };
    }
  }

  async update(id: number, updateBankDto: UpdateBankDto): Promise<bank> {
    const bank = await this.bankModel.findOne({
      where: { bank_entity_id: id },
    });

    if (!bank) {
      throw new NotFoundException(`Bank dengan ID ${id} tidak ditemukan`);
    }
    bank.bank_entity_id = updateBankDto.bank_entity_id;
    bank.bank_code = updateBankDto.bank_code;
    bank.bank_name = updateBankDto.bank_name;

    return await bank.save();
  }

  async delete(id: number) {
    try {
      const entity = await this.entityModel.findByPk(id);
      if (!entity) {
        return { error: 'Id bank yang dimasukkan tidak ada' };
      }

      await entity.destroy();
      await this.bankModel.destroy({ where: { bank_entity_id: id } });

      return { success: `Berhasil menghapus data bank dengan id ${id}` };
    } catch (error) {
      return { error: 'Gagal menghapus data bank' };
    }
  }
}
