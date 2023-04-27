import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentTransactionDto } from './dto/create-payment_transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  payment_transaction,
  user_accounts,
} from 'models/paymentSchema';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { users } from 'models/usersSchema';


@Injectable()
export class PaymentTransactionService {
  constructor(
    @InjectModel(payment_transaction) private paymentTransactionModel: typeof payment_transaction,
    @InjectModel(user_accounts) private userAccountModal: typeof user_accounts,
    @InjectModel(users) private userModel: typeof users,
    private sequelize: Sequelize

  ) { }


  // ===============FINAL PAYMENT ==========================
  async paymentHotel(createPaymentTransaction: CreatePaymentTransactionDto): Promise<any> {
    try {
      let currentUserAccount = await this.userAccountModal.findOne({
        where: { usac_account_number: createPaymentTransaction.sourceId },
      });
      let recipientUserAccount = await this.userAccountModal.findOne({
        where: { usac_account_number: createPaymentTransaction.targetId },
      });



      if (createPaymentTransaction.boorOrderNumber) {
        createPaymentTransaction.payType = 'TBR'
        createPaymentTransaction.payNote = 'Transfer Booking'

        currentUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.sourceId },
        });
        recipientUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.targetId },
        });

        if (!currentUserAccount || !recipientUserAccount) {
          throw new Error('Akun pengguna tidak ditemukan');
        }

        const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
        const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);


        if (currentUserAccountBalance < Number(createPaymentTransaction.debit)) {
          throw new Error('Saldo tidak mencukupi');
        }
        // Update saldo pengirim dan penerima
        currentUserAccount.usac_saldo = (
          currentUserAccountBalance - Number(createPaymentTransaction.debit)
        ).toString();
        recipientUserAccount.usac_saldo = (
          recipientUserAccountBalance + Number(createPaymentTransaction.debit)
        ).toString();
        console.log(recipientUserAccount)
        // Simpan perubahan ke database
        await currentUserAccount.save();
        await recipientUserAccount.save();
      }
      else if (createPaymentTransaction.ormeOrderNumber) {
        createPaymentTransaction.payType = 'ORM'
        createPaymentTransaction.payNote = 'Order Menus'
        const currentUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.sourceId },
        });
        const recipientUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.targetId },
        });

        if (!currentUserAccount || !recipientUserAccount) {
          throw new Error('Akun pengguna tidak ditemukan');
        }

        const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
        const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);


        if (currentUserAccountBalance < Number(createPaymentTransaction.debit)) {
          throw new Error('Saldo tidak mencukupi');
        }
        // Update saldo pengirim dan penerima
        currentUserAccount.usac_saldo = (
          currentUserAccountBalance - Number(createPaymentTransaction.debit)
        ).toString();
        recipientUserAccount.usac_saldo = (
          recipientUserAccountBalance + Number(createPaymentTransaction.debit)
        ).toString();
        // Simpan perubahan ke database
        await currentUserAccount.save();
        await recipientUserAccount.save();
      }

      const createdTransactionPengirim = await this.paymentTransactionModel.create({
        patr_debet: createPaymentTransaction.debit,
        patr_credit: null,
        patr_type: createPaymentTransaction.payType,
        patr_note: createPaymentTransaction.payNote,
        patr_modified_date: new Date(),
        patr_orme_order_number: createPaymentTransaction.ormeOrderNumber,
        patr_boor_order_number: createPaymentTransaction.boorOrderNumber,
        patr_source_id: createPaymentTransaction.sourceId,
        patr_target_id: createPaymentTransaction.targetId,
        patr_trx_number_ref: null,
        patr_user_id: currentUserAccount.usac_user_id
      },
      );
      // return createdTransactionPengirim

      const createdTransactionPenerima = await this.paymentTransactionModel.create({
        patr_debet: null,
        patr_credit: createPaymentTransaction.debit,
        patr_type: createPaymentTransaction.payType,
        patr_note: createPaymentTransaction.payNote,
        patr_modified_date: new Date(),
        patr_orme_order_number: createPaymentTransaction.ormeOrderNumber,
        patr_boor_order_number: createPaymentTransaction.boorOrderNumber,
        patr_source_id: createPaymentTransaction.sourceId,
        patr_target_id: createPaymentTransaction.targetId,
        patr_trx_number_ref: createdTransactionPengirim.patr_trx_number,
        patr_user_id: recipientUserAccount.usac_user_id
      },
      );
      const dataResponse = await this.paymentTransactionModel.findAll(({
        where: {
          patr_trx_number: {
            [Op.in]: [createdTransactionPenerima.patr_trx_number, createdTransactionPengirim.patr_trx_number]
          }
        }
      }))
      return dataResponse
    } catch (error) {

      throw error;
    }
  }

  // ======FINAL TOPUP==============
  async topUp(createPaymentTransaction: CreatePaymentTransactionDto): Promise<any> {
      try {
        createPaymentTransaction.payType = 'TP'
        createPaymentTransaction.payNote = 'Topup'
        
        let currentUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.sourceId },
        });
        let recipientUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.targetId },
        });
      
          if (!currentUserAccount || !recipientUserAccount) {
            return{
              status:400,
              message:'Account Number Not Found'
             }
          }
      
          const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
          const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);
          
      
          if (currentUserAccountBalance < Number(createPaymentTransaction.debit)) {
           return{
            status:400,
            message:'The balance is not sufficient'
           }
          }
          // Update saldo pengirim dan penerima
          currentUserAccount.usac_saldo = (
            currentUserAccountBalance - Number(createPaymentTransaction.debit)
          ).toString();
          recipientUserAccount.usac_saldo = (
            recipientUserAccountBalance + Number(createPaymentTransaction.debit)
          ).toString();
    
          // Simpan perubahan ke database
        await currentUserAccount.save();
        await recipientUserAccount.save();
        

      // const pengirim = await user_accounts.update({
      //   usac_saldo:currentUserAccount.usac_saldo
      // },{ where: { usac_account_number: createPaymentTransaction.sourceId } })

      // const penerima = await user_accounts.update({
      //   usac_saldo:recipientUserAccount.usac_saldo
      // },{ where: { usac_account_number: createPaymentTransaction.targetId } })


      const createdTransactionPengirim = await this.paymentTransactionModel.create({
        patr_debet: createPaymentTransaction.debit,
        patr_credit: null,
        patr_type: createPaymentTransaction.payType,
        patr_note: createPaymentTransaction.payNote,
        patr_modified_date: new Date(),
        patr_orme_order_number: null,
        patr_boor_order_number: null,
        patr_source_id: createPaymentTransaction.sourceId,
        patr_target_id: createPaymentTransaction.targetId,
        patr_trx_number_ref: null,
        patr_user_id: currentUserAccount.usac_user_id,
      });
      // return createdTransactionPengirim

      const createdTransactionPenerima = await this.paymentTransactionModel.create({
        patr_debet: null,
        patr_credit: createPaymentTransaction.debit,
        patr_type: createPaymentTransaction.payType,
        patr_note: createPaymentTransaction.payNote,
        patr_modified_date: new Date(),
        patr_orme_order_number: null,
        patr_boor_order_number: null,
        patr_source_id: createPaymentTransaction.sourceId,
        patr_target_id: createPaymentTransaction.targetId,
        patr_trx_number_ref: createdTransactionPengirim.patr_trx_number,
        patr_user_id: recipientUserAccount.usac_user_id,
      });
      // const dataUser=await this.paymentTransactionModel.findOne(users.user_id)
      const dataResponse = await this.paymentTransactionModel.findAll(({
        where: {
          patr_trx_number: {
            [Op.in]: [createdTransactionPenerima.patr_trx_number, createdTransactionPengirim.patr_trx_number]
          }
        }
      }))
      return dataResponse
    }

    catch (error) {
      throw error;
    }
  }


  async validateAccountPayment(id: string) {
    try {
      return await this.paymentTransactionModel.findOne({ where: { patr_source_id: id } });
    } catch (error) {
      throw new Error(`Akun yang anda masukkan salah`);
    }
  }



  // async findAll(page: number = 1, limit: number = 10): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;
  //     const result = await this.paymentTransactionModel.findAndCountAll({

  //       attributes: [
  //         'patr_trx_number', 
  //         'patr_modified_date',
  //         'patr_debet',
  //         'patr_credit',
  //         'patr_note',
  //         [
  //           Sequelize.literal(`COALESCE("patr_boor_order_number", '') || COALESCE(' ' || "patr_orme_order_number", '')`),
  //           'orderNumber'
  //         ],
  //         'patr_source_id',
  //         'patr_target_id',
  //         'patr_trx_number_ref',
  //         'patr_type',
  //         'patr_user_id'
  //         [Sequelize.col('users.user_full_name'), 'user_name']
  //       ], 

  //       offset,
  //       limit,
  //     });
  //     if (result.count === 0) {
  //       return {
  //         message: 'Payment History Not Found!',
  //       };
  //     }
  //     const totalItems = result.count;
  //     const totalPages = Math.ceil(totalItems / limit);
  //     const currentPage = page;
  //     const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  //     const prevPage = currentPage > 1 ? currentPage - 1 : null;
  //     return { result,
  //       message: 'Payment Transaction History has been found!',
  //       data: result.rows,
  //       pagination: {
  //         currentPage,
  //         nextPage,
  //         prevPage,
  //         totalPages,
  //         totalItems,
  //       },
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }


  // async findAll(page: number = 1, limit: number = 10, search: string = ''): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;
  //     const result = await this.paymentTransactionModel.findAndCountAll({

  //       attributes: [
  //         'patr_trx_number', 
  //         'patr_modified_date',
  //         'patr_debet',
  //         'patr_credit',
  //         'patr_note',
  //         [
  //           Sequelize.literal(`COALESCE("patr_boor_order_number", '') || COALESCE(' ' || "patr_orme_order_number", '')`),
  //           'orderNumber'
  //         ],
  //         'patr_source_id',
  //         'patr_target_id',
  //         'patr_trx_number_ref',
  //         'patr_type',
  //         'patr_user_id'
  //         [Sequelize.col('users.user_full_name'), 'user_name']
  //       ],
  //       where: {
  //         [Op.or]: [
  //           { patr_trx_number: { [Op.iLike]: `%${search}%` } },
  //           { patr_note: { [Op.iLike]: `%${search}%` } },
  //           { patr_type: { [Op.iLike]: `%${search}%` } },
  //           // { '$user.user_full_name$': { [Op.iLike]: `%${search}%` } }
  //         ]
  //       },
  //       include: [{ model: users, as: 'user', attributes: [] }],
  //       offset,
  //       limit,
  //     });
  //     if (result.count === 0) {
  //       return {
  //         message: 'Payment History Not Found!',
  //       };
  //     }
  //     const totalItems = result.count;
  //     const totalPages = Math.ceil(totalItems / limit);
  //     const currentPage = page;
  //     const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  //     const prevPage = currentPage > 1 ? currentPage - 1 : null;
  //     return { result,
  //       message: 'Payment Transaction History has been found!',
  //       data: result.rows,
  //       pagination: {
  //         currentPage,
  //         nextPage,
  //         prevPage,
  //         totalPages,
  //         totalItems,
  //       },
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }




  // async findAll(page: number = 1, limit: number = 10, trxNumber?: string): Promise<any> {
  //   try {
  //     const offset = (page - 1) * limit;
  //     const whereClause: any = {};
  //     if (trxNumber) {
  //       whereClause.patr_trx_number = trxNumber;
  //     }
  //     const result = await this.paymentTransactionModel.findAndCountAll({
  //       where:whereClause,
  //       include: [
  //         {
  //           model: users,       
  //         },

  //       ],
  //       attributes: [
  //         'patr_trx_number', 
  //         'patr_modified_date',
  //         'patr_debet',
  //         'patr_credit',
  //         'patr_note',
  //         [
  //           Sequelize.literal(`COALESCE("patr_boor_order_number", '') || COALESCE(' ' || "patr_orme_order_number", '')`),
  //           'orderNumber'
  //         ],
  //         'patr_source_id',
  //         'patr_target_id',
  //         'patr_trx_number_ref',
  //         'patr_type',
  //         'patr_user_id',
  //       ],
  //       offset,
  //       limit,
  //     });
  //     if (result.count === 0) {
  //       return {
  //         message: 'Payment History Not Found!',
  //       };
  //     }
  //     const totalItems = result.count;
  //     const totalPages = Math.ceil(totalItems / limit);
  //     const currentPage = page;
  //     const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  //     const prevPage = currentPage > 1 ? currentPage - 1 : null;
  //     return { 
  //       message: 'Payment Transaction History has been found!',
  //       data: result.rows,
  //       pagination: {
  //         currentPage,
  //         nextPage,
  //         prevPage,
  //         totalPages,
  //         totalItems,
  //       },
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async findAll(search?: any, page?: number, limit?: number, type?: string) {
  //   try {
  //   const pages = page || 1;
  //   const limits = limit || 10;
  //   const types = type || '';
  //   const searchs = search || '';
  //   const offset = limits * (pages - 1);
  //   const totalRows = await this.paymentTransactionModel.count({
  //     where: {
  //       [Op.or]: [
  //         {
  //           patr_trx_number: {
  //             [Op.iLike]: '%' + searchs + '%',
  //           },
  //           patr_type: {
  //             [Op.iLike]: '%' + types + '%',
  //           },
  //           patr_user_id: 'patr_user_id',
  //         },
  //       ],
  //     },
  //     include: {
  //       model: users,
  //     },
  //   });

  //   const totalPage = Math.ceil(totalRows / limits);

  //   const result = await this.paymentTransactionModel.findAll({
  //     attributes: [
  //       'patr_trx_number',
  //       'patr_modified_date',
  //       'patr_debet',
  //       'patr_credit',
  //       'patr_note',
  //       [
  //         Sequelize.literal(
  //           `COALESCE("patr_boor_order_number", '') || COALESCE(' ' || "patr_orme_order_number", '')`
  //         ),
  //         'orderNumber',
  //       ],
  //       'patr_source_id',
  //       'patr_target_id',
  //       'patr_trx_number_ref',
  //       'patr_type',
  //       'patr_user_id',
  //     ],
  //     include: {
  //       model: users,
  //     },
  //     where: {
  //       [Op.or]: [
  //         {
  //           patr_trx_number: {
  //             [Op.iLike]: '%' + searchs + '%',
  //           },
  //           patr_type: {
  //             [Op.iLike]: '%' + types + '%',
  //           },
  //           patr_user_id:'patr_user_id' ,
  //         },
  //       ],
  //     },
  //     offset: offset,
  //     limit: limit,
  //     order: [['patr_trx_number', 'DESC']],
  //   });

  //   return {result:[],
  //     status: 200,
  //     message: 'success',
  //     data: result,
  //     page: pages,
  //     limit: limits,
  //     totalRows: totalRows,
  //     totalPage: totalPage,
  //   };
  // } catch (err) {
  //   return {
  //   status: 400,
  //   message: err,
  //   };
  //   }
  //   }    

  //  async findAll(search?: any, page?: number, limit?: number, type?: string) {
  //   try {
  //     const pages = page || 1;
  //     const limits = limit || 10;
  //     const types = type || '';
  //     const searchs = search || '';
  //     const offset = limits * (pages - 1);

  //     const totalRows = await this.paymentTransactionModel.count({
  //       where: {
  //         [Op.or]: [
  //           {
  //             patr_trx_number: {
  //               [Op.iLike]: '%' + searchs + '%',
  //             },
  //             patr_type: {
  //               [Op.iLike]: '%' + types + '%',
  //             },
  //             patr_user_id: 'patr_user_id',
  //           },
  //         ],
  //       },
  //       include: {
  //         model: users,
  //       },
  //     });

  //     const totalPage = Math.ceil(totalRows / limits);

  //     const result = await this.paymentTransactionModel.findAll({
  //       attributes: [
  //         'patr_trx_number',
  //         'patr_modified_date',
  //         'patr_debet',
  //         'patr_credit',
  //         'patr_note',
  //         [
  //           Sequelize.literal(
  //             `COALESCE("patr_boor_order_number", '') || COALESCE(' ' || "patr_orme_order_number", '')`
  //           ),
  //           'orderNumber',
  //         ],
  //         'patr_source_id',
  //         'patr_target_id',
  //         'patr_trx_number_ref',
  //         'patr_type',
  //         'patr_user_id',
  //       ],
  //       include: {
  //         model: users,
  //         attributes: ['user_full_name'],
  //         as: 'user'
  //       },
  //       where: {
  //         [Op.or]: [
  //           {
  //             patr_trx_number: {
  //               [Op.iLike]: '%' + searchs + '%',
  //             },
  //             patr_type: {
  //               [Op.iLike]: '%' + types + '%',
  //             },
  //             patr_user_id: 'patr_user_id' ,
  //           },
  //         ],
  //       },
  //       offset: offset,
  //       limit: limit,
  //       order: [['patr_trx_number', 'DESC']],
  //     });

  //     result.forEach((data: any) => {
  //       const user = data.user as any;
  //       data.setDataValue('user_full_name', user.user_full_name);
  //       delete data.user;
  //     });

  //     return {
  //       status: 200,
  //       message: 'success',
  //       data: result,
  //       page: pages,
  //       limit: limits,
  //       totalRows: totalRows,
  //       totalPage: totalPage,
  //     };
  //   } catch (err) {
  //     return {
  //       status: 400,
  //       message: err,
  //     };
  //   }
  // }

  // async findAll(
  //   search: string = '',
  //   page: number = 1,
  //   limit: number = 10,
  //   type: string = '',
  // ) {
  //   const offset = limit * (page - 1);
  //   const where = {
  //     [Op.or]: [
  //       {
  //         patr_trx_number: {
  //           [Op.iLike]: `%${search}%`,
  //         },
  //         patr_type: {
  //           [Op.iLike]: `%${type}%`,
  //         },
  //       },
  //     ],
  //   };

  //   const include: FindAndCountOptions['include'] = [
  //     {
  //       model: this.userModel,
  //       attributes: ['user_full_name'],
  //     },
  //   ];

  //   const result = await this.paymentTransactionModel.findAndCountAll({
  //     where,
  //     include,
  //     offset,
  //     limit,
  //     order: [['patr_trx_number', 'DESC']],
  //   });

  //   const totalRows = result.count;
  //   const totalPage = Math.ceil(totalRows / limit);

  //   return {
  //     status: 200,
  //     message: 'success',
  //     data: result.rows,
  //     page,
  //     limit,
  //     totalRows,
  //     totalPage,
  //   };
  // }
  // }

  // ===========berhasil==========
  async findAll(
    search: string,
    page: number,
    limit: number,
    type: string,
    id: number,
  ) {
    const offset = limit * (page - 1);
    const where = {
      [Op.or]: [
        {
          patr_trx_number: {
            [Op.iLike]: `%${search}%`,
          },
          patr_type: {
            [Op.iLike]: `%${type}%`,
          },
        },
      ],
      patr_user_id: id,
    };

    const query = `SELECT * FROM payment."getallpaymenttransaction"
                WHERE patr_trx_number ILIKE '%${search}%' 
                AND patr_type ILIKE '%${type}%'
                AND "patr_user_id" =  ${id}
                ORDER BY patr_trx_number DESC
                OFFSET ${offset}
                LIMIT ${limit}`;

    const [results, metadata]: any = await this.sequelize.query(query);

    const totalRows = metadata.rowCount;
    const totalPage = Math.ceil(totalRows / limit);

    return {
      status: 200,
      message: 'success',
      data: results,
      page,
      limit,
      totalRows,
      totalPage,
    };
  }

  async removeTransactionById(idTransaction: any) {
    try {
      const dataPaymentTransactionResponse = await this.paymentTransactionModel.destroy({
        where: {

        }
      })
    } catch (error) {
      return error
    }
  }
}



















