import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { bank, entity, fintech, user_accounts } from 'models/paymentSchema';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(user_accounts) private userAccountModel: typeof user_accounts,
    private sequelize: Sequelize
  ) { }

  async findBFAll() {
    try {
      const result = await this.sequelize.query(
        `SELECT * FROM payment."getAllBankFintech"`,
      );
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserAccountAndRealta(metPemUser: any, rekeningUser: any, metPemRealta: any, rekeningRealta: any) {
    try {
      console.log(metPemUser)
      const result = await this.sequelize.query(`SELECT * FROM payment."findUserAccount" where "usac_account_number" = ${rekeningUser} and "entity_name" = ${metPemUser}`)

      return result
    } catch (error) {
      throw new Error(`Gagal mendapatkan data akun pengguna ${error}`)
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





  async findAll(id: number | undefined, bank_name: string | undefined, rekening_user: string | undefined) {
    try {
      console.log(id)

      if (id !== undefined) {
        const result = await this.sequelize.query(`SELECT * FROM payment."findUserAccount" where "usac_user_id" = ${id}`);
        return result[0];
      } else if (bank_name && rekening_user) {
        console.log(bank_name, rekening_user)
        const result = await this.sequelize.query(`SELECT * FROM payment."findUserAccount" where "entity_name" = '${bank_name}' and "usac_account_number" = '${rekening_user}'`);
        return result[0];
      } else {
        throw new Error("Parameter input tidak valid");
      }
    } catch (error) {
      throw new Error(`Gagal mendapatkan data akun pengguna: ${error}`);
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
      return await this.userAccountModel.findOne({ where: { usac_account_number: id } });
    } catch (error) {
      throw new Error(
        `Gagal mendapatkan akun pengguna dengan id: ${error.message}`,
      );
    }
  }

  async update(
    accountNumber: string,
    updateUserAccountsDto: UpdateUserAccountDto,
  ): Promise<user_accounts> {
    try {


      const userAccount = await this.userAccountModel.findOne({
        where: { usac_account_number: accountNumber },
      });

      if (!userAccount) {
        throw new NotFoundException(
          `Akun pengguna dengan nomor rekening ${accountNumber} tidak ditemukan`,
        );
      }

      userAccount.usac_entity_id = updateUserAccountsDto.usac_entity_id;
      userAccount.usac_user_id = updateUserAccountsDto.usac_user_id;
      userAccount.usac_saldo = String(updateUserAccountsDto.usac_saldo);
      userAccount.usac_type = updateUserAccountsDto.usac_type;
      userAccount.usac_expmonth = updateUserAccountsDto.usac_expmonth;
      userAccount.usac_expyear = updateUserAccountsDto.usac_expyear;

      return await userAccount.save();
    } catch (error) {
      throw new Error(
        `Gagal mengupdate data akun pengguna dengan nomor rekening ${accountNumber}: ${error.message}`,
      );
    }
  }


  async delete(id: any) {
    try {
      const entity = await this.userAccountModel.findOne(id);
      if (!entity) {
        return { error: 'Uses Account yang dimasukkan tidak ada' };
      }

      await this.userAccountModel.destroy({
        where: { usac_account_number: id },
      });

      return {
        success: `Berhasil menghapus data user account dengan id ${id}`,
      };
    } catch (error) {
      return { error: 'Gagal menghapus data user account' };
    }
  }
}
