import { Injectable } from '@nestjs/common';
import { CreatePaymentTransactionDto } from './dto/create-payment_transaction.dto';
import { UpdatePaymentTransactionDto } from './dto/update-payment_transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  payment_transaction,
  user_accounts,
} from 'models/paymentSchema';
import {Sequelize} from 'sequelize';
import { Op } from 'sequelize';
import { users } from 'models/usersSchema';


@Injectable()
export class PaymentTransactionService {
  sequelize: any;
  bookingService: any;
  constructor(
    @InjectModel(payment_transaction) private paymentTransactionModel: typeof payment_transaction,
    @InjectModel(user_accounts) private userAccountModal: typeof user_accounts,
    @InjectModel(users) private userModel: typeof users,
  ) {}

// ===============FINAL PAYMENT ==========================
  async paymentHotel(createPaymentTransaction: CreatePaymentTransactionDto): Promise<any> {
    try {
      let currentUserAccount = await this.userAccountModal.findOne({
        where: { usac_account_number: createPaymentTransaction.sourceId },
      });
      let recipientUserAccount = await this.userAccountModal.findOne({
        where: { usac_account_number: createPaymentTransaction.sourceId },
      });
  


      if(createPaymentTransaction.boorOrderNumber){
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
        
    
        if (currentUserAccountBalance < Number(createPaymentTransaction.credit)) {
          throw new Error('Saldo tidak mencukupi');
        }
        // Update saldo pengirim dan penerima
        currentUserAccount.usac_saldo = (
          currentUserAccountBalance - Number(createPaymentTransaction.credit)
        ).toString();
        recipientUserAccount.usac_saldo = (
          recipientUserAccountBalance + Number(createPaymentTransaction.credit)
        ).toString();
        console.log(recipientUserAccount)
        // Simpan perubahan ke database
        await currentUserAccount.save();
        await recipientUserAccount.save();



      } 
      else if(createPaymentTransaction.ormeOrderNumber){
        createPaymentTransaction.payType='ORM'
        createPaymentTransaction.payNote='Order Menus'
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
        
    
        if (currentUserAccountBalance < Number(createPaymentTransaction.credit)) {
          throw new Error('Saldo tidak mencukupi');
        }
        // Update saldo pengirim dan penerima
        currentUserAccount.usac_saldo = (
          currentUserAccountBalance - Number(createPaymentTransaction.credit)
        ).toString();
        recipientUserAccount.usac_saldo = (
          recipientUserAccountBalance + Number(createPaymentTransaction.credit)
        ).toString();
        console.log(recipientUserAccount)
        // Simpan perubahan ke database
        await currentUserAccount.save();
        await recipientUserAccount.save();
      }
      
        const createdTransactionPengirim = await this.paymentTransactionModel.create({
          patr_debet : null,
          patr_credit : createPaymentTransaction.credit,
          patr_type : createPaymentTransaction.payType,
          patr_note : createPaymentTransaction.payNote,
          patr_modified_date : new Date(),
          patr_orme_order_number: createPaymentTransaction.ormeOrderNumber,
          patr_boor_order_number:createPaymentTransaction.boorOrderNumber,
          patr_source_id : createPaymentTransaction.sourceId,
          patr_target_id: createPaymentTransaction.targetId,
          patr_trx_number_ref: null,
          patr_user_id : createPaymentTransaction.userId
        },
        );
        // return createdTransactionPengirim

        const createdTransactionPenerima = await this.paymentTransactionModel.create({
          patr_debet : createPaymentTransaction.credit,
          patr_credit : null,
          patr_type : createPaymentTransaction.payType,
          patr_note : createPaymentTransaction.payNote,
          patr_modified_date : new Date(),
          patr_orme_order_number: createPaymentTransaction.ormeOrderNumber,
          patr_boor_order_number:createPaymentTransaction.boorOrderNumber,
          patr_source_id : createPaymentTransaction.sourceId,
          patr_target_id: createPaymentTransaction.targetId,
          patr_trx_number_ref: createdTransactionPengirim.patr_trx_number,
          patr_user_id : recipientUserAccount.usac_user_id
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
        let currentUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.sourceId },
        });
        let recipientUserAccount = await this.userAccountModal.findOne({
          where: { usac_account_number: createPaymentTransaction.targetId },
        });
      
          if (!currentUserAccount || !recipientUserAccount) {
            throw new Error('Akun pengguna tidak ditemukan');
          }
      
          const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
          const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);
          
      
          if (currentUserAccountBalance < Number(createPaymentTransaction.credit)) {
            throw new Error('Saldo tidak mencukupi');
          }
          // Update saldo pengirim dan penerima
          currentUserAccount.usac_saldo = (
            currentUserAccountBalance - Number(createPaymentTransaction.credit)
          ).toString();
          recipientUserAccount.usac_saldo = (
            recipientUserAccountBalance + Number(createPaymentTransaction.credit)
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
            patr_debet : null,
            patr_credit : createPaymentTransaction.credit,
            patr_type : createPaymentTransaction.payType,
            patr_note : createPaymentTransaction.payNote,
            patr_modified_date : new Date(),
            patr_orme_order_number: null,
            patr_boor_order_number:null,
            patr_source_id : createPaymentTransaction.sourceId,
            patr_target_id: createPaymentTransaction.targetId,
            patr_trx_number_ref: null,
            patr_user_id : createPaymentTransaction.userId,
          });
          // return createdTransactionPengirim
    
          const createdTransactionPenerima = await this.paymentTransactionModel.create({
            patr_debet : createPaymentTransaction.credit,
            patr_credit : null,
            patr_type : createPaymentTransaction.payType,
            patr_note : createPaymentTransaction.payNote,
            patr_modified_date : new Date(),
            patr_orme_order_number: null,
            patr_boor_order_number:null,
            patr_source_id : createPaymentTransaction.sourceId,
            patr_target_id: createPaymentTransaction.targetId,
            patr_trx_number_ref: createdTransactionPengirim.patr_trx_number,
            patr_user_id : recipientUserAccount.usac_user_id, 
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
        return await this.paymentTransactionModel.findOne({where:{patr_source_id:id}});
      } catch (error) {
        throw new Error(`Akun yang anda masukkan salah`);
      }
    }

    

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await this.paymentTransactionModel.findAndCountAll({
       
        attributes: [
          'patr_trx_number', 
          'patr_modified_date',
          'patr_debet',
          'patr_credit',
          'patr_note',
          [
            Sequelize.literal(`COALESCE("patr_boor_order_number", '') || COALESCE(' ' || "patr_orme_order_number", '')`),
            'orderNumber'
          ],
          'patr_source_id',
          'patr_target_id',
          'patr_trx_number_ref',
          'patr_type',
          'patr_user_id'
          // [Sequelize.col('users.user_name'), 'user_name']
        ], 
        //  
        // include: [{
        //   model: this.userModel,
        //   as: 'user',
        //   attributes: ['user_name'],
        //   required: true,
        // }],
        offset,
        limit,
      });
      if (result.count === 0) {
        return {
          message: 'Payment History Not Found!',
        };
      }
      const totalItems = result.count;
      const totalPages = Math.ceil(totalItems / limit);
      const currentPage = page;
      const nextPage = currentPage < totalPages ? currentPage + 1 : null;
      const prevPage = currentPage > 1 ? currentPage - 1 : null;
      return {
        message: 'Payment Transaction History has been found!',
        data: result.rows,
        pagination: {
          currentPage,
          nextPage,
          prevPage,
          totalPages,
          totalItems,
        },
      };
    } catch (error) {
      return error;
    }
  }
  
  


}

  
  











  



