import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { user_accounts } from 'models/paymentSchema';
import { InjectModel } from '@nestjs/sequelize';
import {  Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(user_accounts) private userAccountModel: typeof user_accounts,
    private sequelize: Sequelize
  ) {}

  async findBFAll() {
    try {
      const result = await this.sequelize.query(`SELECT * FROM payment."getAllBankFintech"`);
      return result[0]
    } catch (error) {
      throw new Error(error);
    }
  }

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
    },
    );
    console.log(userAccounts)
    return userAccounts;
  } catch (error) {
    return error;
  }
}



// async create(createUserAccountDto: CreateUserAccountDto): Promise<user_accounts> {
//   try { 
//     const userAccount = await this.userAccountModel.create({
//       usac_entity_id: createUserAccountDto.usac_entity_id,
//       usac_user_id: createUserAccountDto.usac_user_id,
//       usac_account_number: createUserAccountDto.usac_account_number,
//       usac_saldo: String(createUserAccountDto.usac_saldo),
//       usac_type: createUserAccountDto.usac_type,
//       usac_expmonth: createUserAccountDto.usac_expmonth,
//       usac_expyear: createUserAccountDto.usac_expyear,
//     }, {
//       include: [
//         { model: bank, attributes: ['bank_name'] },
//         { model: fintech, attributes: ['fint_name'] },
//       ],
//     });

//     return userAccount;
//   } catch (error) {
//     throw new (error);
//   }
// }





  async findAll() {
    try {
      const result = await this.sequelize.query(`SELECT * FROM payment."findUserAccount"`);
      return result[0]
    } catch (error) {
      throw new Error(`Gagal mendapatkan data akun pengguna ${error}`);
    }
  }

  // async findAll(searchTerm?: string) {
  //   try {
  //     let cari = {};
  //     if (searchTerm) {
  //       cari = { bank_name: { [Op.iLike]: `%${searchTerm}%` } };
  //     }
  //     const userAccounts = await this.userAccountModel.findAll({ where: cari });
  //     return { data: userAccounts };
  //   } catch (error) {
  //     return { error: 'Failed to get banks' };
  //   }
  // }





  // async findAll(searchTerm: string = '', page: number = 1, limit: number = 10): Promise<any> {
  //   try {
  //     const offset = limit * (page - 1);
  //     const result = await this.userAccountModel.findAndCountAll({
  //       attributes: ['usac_account_number', 'usac_saldo', 'usac_type'],
  //       include:[
  //         {
  //           model: users,
  //           attributes: ['user_full_name'],
  //           required: true,
  //         }
  //       ],
  //       where: {[
  //         user: {
  //           [Op.iLike]: `%${searchTerm}%`
  //         }]
  //       },
  //       offset,
  //       limit,
  //     });
  
  //     const { count: totalData, rows: userAccounts } = result;
  
  //     const totalPage = Math.ceil(totalData / limit);
  //     const pagination = {
  //       totalData,
  //       totalPage,
  //       currentPage: page,
  //       perPage: limit
  //     };
  
  //     if (userAccounts.length === 0) {
  //       return {
  //         message: 'User Account tidak ditemukan!',
  //         pagination,
  //         data: []
  //       };
  //     }
  
  //     return {
  //       data: userAccounts,
  //       pagination,
  //     };
  //   } catch (error) {
  //     return { error: 'Failed to get user accounts' };
  //   }
  // }
  

  
  


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
  

  async delete(id: any) {
    try {
      const entity = await this.userAccountModel.findOne(id);
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
