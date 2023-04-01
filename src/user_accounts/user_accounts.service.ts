import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { user_accounts } from 'models/paymentSchema';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(user_accounts) private userAccountModel: typeof user_accounts,
  ) {}

async create(createUserAccountDto: CreateUserAccountDto) {
  try { 
    const userAccounts = await this.userAccountModel.create({
      usac_entity_id: createUserAccountDto.usac_entity_id,
      usac_user_id: createUserAccountDto.usac_user_id,
      usac_account_number: createUserAccountDto.usac_account_number,
      usac_saldo: String(createUserAccountDto.usac_saldo),
      usac_type: createUserAccountDto.usac_type,
      usac_expmonth: createUserAccountDto.usac_expmonth,
      usac_expyear: createUserAccountDto.usac_expyear,
    });
    return userAccounts;
  } catch (error) {
    return "Terjadi kesalahan saat membuat akun pengguna";
  }
}


  async findAll(): Promise<user_accounts[]> {
    try {
      return await this.userAccountModel.findAll();
    } catch (error) {
      throw new Error(`Gagal mendapatkan data akun pengguna`);
    }
  }


  async findOne(id: string) {
    try {
      return await this.userAccountModel.findOne({where:{usac_account_number:id}});
    } catch (error) {
      throw new Error(`Gagal mendapatkan akun pengguna dengan id: ${error.message}`);
    }
  }

  async update(accountNumber: string, updateUserAccountsDto: UpdateUserAccountDto): Promise<user_accounts> {
    try {
      const userAccount = await this.userAccountModel.findOne({ where: { usac_account_number: accountNumber } });
  
      if (!userAccount) {
        throw new NotFoundException(`Akun pengguna dengan nomor rekening ${accountNumber} tidak ditemukan`);
      }
  
      userAccount.usac_entity_id = updateUserAccountsDto.usac_entity_id;
      userAccount.usac_user_id = updateUserAccountsDto.usac_user_id;
      userAccount.usac_saldo = String(updateUserAccountsDto.usac_saldo);
      userAccount.usac_type = updateUserAccountsDto.usac_type;
      userAccount.usac_expmonth = updateUserAccountsDto.usac_expmonth;
      userAccount.usac_expyear = updateUserAccountsDto.usac_expyear;
  
      return await userAccount.save();
    } catch (error) {
      throw new Error(`Gagal mengupdate data akun pengguna dengan nomor rekening ${accountNumber}: ${error.message}`);
    }
  }
  

  async delete(id: string) {
    try {
      const entity = await this.userAccountModel.findByPk(id);
      if (!entity) {
        return { error: 'Uses Account yang dimasukkan tidak ada' };
      }

      await entity.destroy();
      await this.userAccountModel.destroy({ where: { usac_account_number: id } });

      return { success: `Berhasil menghapus data user account dengan id ${id}` };
    } catch (error) {
      return { error: 'Gagal menghapus data user account' };
    }
  }
}
