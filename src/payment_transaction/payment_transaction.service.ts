import { Injectable } from '@nestjs/common';
import { CreatePaymentTransactionDto } from './dto/create-payment_transaction.dto';
import { UpdatePaymentTransactionDto } from './dto/update-payment_transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  payment_transaction,
  user_accounts,
} from 'models/paymentSchema';
import { CreateUserAccountDto } from 'src/user_accounts/dto/create-user_account.dto';
import {Sequelize, Transaction} from 'sequelize';
import { booking_orders } from 'models/bookingSchema';
import { order_menus } from 'models/restoSchema';
import { CreateBookingOrderDto } from 'src/booking_orders/dto/create-booking_order.dto';
import { CreateOrderMenuDto } from 'src/order_menus/dto/create-order_menu.dto';
import { Op } from 'sequelize';
import { FindOptions } from 'sequelize/types';

@Injectable()
export class PaymentTransactionService {
  sequelize: any;
  bookingService: any;
  constructor(
    @InjectModel(payment_transaction) private paymentTransactionModel: typeof payment_transaction,
    @InjectModel(user_accounts) private userAccountModal: typeof user_accounts,
    @InjectModel(booking_orders) private bookingOrderModel: typeof booking_orders,
    @InjectModel(order_menus) private orderMenusModel: typeof order_menus,
  ) {}

  // async topupUserAccount(amount: number, recipientAccountId: number): Promise<void> {
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: amount } });
  //   const recipientUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: recipientAccountId } });

  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);

  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }

  //   // Update saldo pengirim dan penerima
  //   Number(currentUserAccount.usac_saldo )= currentUserAccountBalance - amount;
  //   Number(recipientUserAccount.usac_saldo )= recipientUserAccountBalance + amount;

  //   // Simpan perubahan ke database
  //   await currentUserAccount.save();
  //   await recipientUserAccount.save();
  // }

  // ------------------------------------------
  // async topupUserAccount(amount: number, recipientAccountId: number): Promise<void> {
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: amount } });
  //   const recipientUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: recipientAccountId } });

  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }

  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);

  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }

  //   // Update saldo pengirim dan penerima
  //   currentUserAccount.usac_saldo = (currentUserAccountBalance - amount).toString();
  //   recipientUserAccount.usac_saldo = (recipientUserAccountBalance + amount).toString();

  //   // Simpan perubahan ke database
  //   await currentUserAccount.save();
  //   await recipientUserAccount.save();
  // }

  // ----------------------------------------------
  //   async topupUserAccount(currentUserAccountId: number, recipientAccountId: number): Promise<void> {
  //     // Mendapatkan data saldo pengirim dan penerima
  //     const currentUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: currentUserAccountId } });
  //     const recipientUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: recipientAccountId } });

  //     if (!currentUserAccount || !recipientUserAccount) {
  //       throw new Error('Akun pengguna tidak ditemukan');
  //     }

  //     const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //     const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);

  //     if (currentUserAccountBalance < CreatePaymentTransactionDto.amount) {
  //       throw new Error('Saldo tidak mencukupi');
  //     }

  //     // Update saldo pengirim dan penerima
  //     currentUserAccount.usac_saldo = (currentUserAccountBalance - CreatePaymentTransactionDto.amount).toString();
  //     recipientUserAccount.usac_saldo = (recipientUserAccountBalance + CreatePaymentTransactionDto.amount).toString();

  //     // Simpan perubahan ke database
  //     await currentUserAccount.save();
  //     await recipientUserAccount.save();

  //     const sender = {usac_account_number: currentUserAccount.usac_account_number, usac_saldo: currentUserAccount.usac_saldo};
  //     const recipient = {usac_account_number: recipientUserAccount.usac_account_number, usac_saldo: recipientUserAccount.usac_saldo};

  //     return {sender, recipient};
  // }

  // async topupUserAccount(currentUserAccountId: number, recipientAccountId: number): Promise<{ sender: { usac_account_number: string, usac_saldo: string }, recipient: { usac_account_number: string, usac_saldo: string } }> {
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: currentUserAccountId } });
  //   const recipientUserAccount = await this.userAccountModal.findOne({ where: { usac_account_number: recipientAccountId } });

  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }

  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);

  //   if (currentUserAccountBalance < CreatePaymentTransactionDto.amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }

  //   // Update saldo pengirim dan penerima
  //   currentUserAccount.usac_saldo = (currentUserAccountBalance - CreatePaymentTransactionDto.amount).toString();
  //   recipientUserAccount.usac_saldo = (recipientUserAccountBalance + CreatePaymentTransactionDto.amount).toString();

  //   // Simpan perubahan ke database
  //   await currentUserAccount.save();
  //   await recipientUserAccount.save();

  //   const sender = {usac_account_number: currentUserAccount.usac_account_number, usac_saldo: currentUserAccount.usac_saldo};
  //   const recipient = {usac_account_number: recipientUserAccount.usac_account_number, usac_saldo: recipientUserAccount.usac_saldo};

  //   return {sender, recipient};
  // }

  // -------------------------------------------------------------
  // async topupUserAccount(
  //   currentUserAccountId: number,
  //   recipientAccountId: number,
  //   amount: number,
  // ): Promise<{
  //   sender: { usac_account_number: string; usac_saldo: string };
  //   recipient: { usac_account_number: string; usac_saldo: string };
  // }> {
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: currentUserAccountId },
  //   });
  //   const recipientUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: recipientAccountId },
  //   });

  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }

  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);

  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }

  //   // Update saldo pengirim dan penerima
  //   currentUserAccount.usac_saldo = (
  //     currentUserAccountBalance - amount
  //   ).toString();
  //   recipientUserAccount.usac_saldo = (
  //     recipientUserAccountBalance + amount
  //   ).toString();

  //   // Simpan perubahan ke database
  //   await currentUserAccount.save();
  //   await recipientUserAccount.save();

  //   const sender = {
  //     usac_account_number: currentUserAccount.usac_account_number,
  //     usac_saldo: currentUserAccount.usac_saldo,
  //   };
  //   const recipient = {
  //     usac_account_number: recipientUserAccount.usac_account_number,
  //     usac_saldo: recipientUserAccount.usac_saldo,
  //   };

  //   return { sender, recipient };
  // }

  // -CODE BERHASIL MELAKUKAN TOPUP DAN PERBAHARUI SALDO TP MASIH FOKUS PADA USER ACCOUNTS
  // async topupUserAccount(
  //   currentUserAccountId: number,
  //   recipientAccountId: number,
  //   amount: number,
  // ): Promise<{
  //   sender: { usac_account_number: string; usac_saldo: string };
  //   recipient: { usac_account_number: string; usac_saldo: string };
  // }> {
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: currentUserAccountId },
  //   });
  //   const recipientUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: recipientAccountId },
  //   });

  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }

  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);
    

  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }
  //   // Update saldo pengirim dan penerima
  //   currentUserAccount.usac_saldo = (
  //     currentUserAccountBalance - Number(amount)
  //   ).toString();
  //   recipientUserAccount.usac_saldo = (
  //     recipientUserAccountBalance + Number(amount)
  //   ).toString();
  //   console.log(recipientUserAccount)
  //   // Simpan perubahan ke database
  //   await currentUserAccount.save();
  //   await recipientUserAccount.save();

  //   const sender = {
  //     usac_account_number: currentUserAccount.usac_account_number,
  //     usac_saldo: currentUserAccount.usac_saldo,
  //   };
  //   const recipient = {
  //     usac_account_number: recipientUserAccount.usac_account_number,
  //     usac_saldo: recipientUserAccount.usac_saldo,
  //   };

  //   return { sender, recipient };
  // }


  // async topupUserAccount(
  //   currentUserAccountId: number,
  //   recipientAccountId: number,
  //   amount: number,
  // ): Promise<{
  //   sender: { usac_account_number: string; usac_saldo: string };
  //   recipient: { usac_account_number: string; usac_saldo: string };
  // }> {
  //   const sequelize = new Sequelize()
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: currentUserAccountId },
  //   });
  //   const recipientUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: recipientAccountId },
  //   });
  
  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }
  
  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);
  
  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }

  //   // Mulai transaction
  //   const transaction = await sequelize.transaction.bind(sequelize);
  
  //   try {
  //     const newTransaction = await this.paymentTransactionModel.create({
  //       patr_debet: String(amount),
  //       patr_credit: String(0),
  //       patr_type: 'TP',
  //       patr_note: 'Top Up',
  //       patr_modified_date: new Date(),
  //       patr_source_id: currentUserAccountId.toString(),
  //       patr_target_id: recipientAccountId.toString(),
  //       patr_user_id: currentUserAccount.usac_user_id,
  //     });
  
  //     // Update saldo pengirim dan penerima
  //     currentUserAccount.usac_saldo = (currentUserAccountBalance - amount).toString();
  //     recipientUserAccount.usac_saldo = (recipientUserAccountBalance + amount).toString();
  
  //     await currentUserAccount.save();
  //     await recipientUserAccount.save();
  
  //     await transaction.commit();
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw new Error('Gagal melakukan transaksi');
  //   }
  
  //   const sender = {
  //     usac_account_number: currentUserAccount.usac_account_number,
  //     usac_saldo: currentUserAccount.usac_saldo,
  //   };
  //   const recipient = {
  //     usac_account_number: recipientUserAccount.usac_account_number,
  //     usac_saldo: recipientUserAccount.usac_saldo,
  //   };
  
  //   return { sender, recipient };
  // }


  // async topupUserAccount(
  //   currentUserAccountId: number,
  //   recipientAccountId: number,
  //   amount: number,
  // ): Promise<{
  //   sender: { usac_account_number: string; usac_saldo: string };
  //   recipient: { usac_account_number: string; usac_saldo: string };
  // }> {
  //   const sequelize = new Sequelize()
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: currentUserAccountId },
  //     include: [{ model: this.paymentTransactionModel, as: 'senderTransactions' }]
  //   });
  //   const recipientUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: recipientAccountId },
  //     include: [{ model: this.paymentTransactionModel, as: 'recipientTransactions' }]
  //   });
  
  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }
  
  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);
  
  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }
  
  //   // Mulai transaction
  //   const transaction = await sequelize.transaction.bind(sequelize);
  
  //   try {
  //     const newTransaction = await this.paymentTransactionModel.create({
  //       patr_debet: String(amount),
  //       patr_credit: String(0),
  //       patr_type: 'TP',
  //       patr_note: 'Top Up',
  //       patr_modified_date: new Date(),
  //       patr_source_id: currentUserAccountId.toString(),
  //       patr_target_id: recipientAccountId.toString(),
  //       patr_user_id: currentUserAccount.usac_user_id,
  //     });
  
  //     // Update saldo pengirim dan penerima
  //     currentUserAccount.usac_saldo = (currentUserAccountBalance - amount).toString();
  //     recipientUserAccount.usac_saldo = (recipientUserAccountBalance + amount).toString();
  
  //     await currentUserAccount.save();
  //     await recipientUserAccount.save();
  
  //     await transaction.commit();
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw new Error('Gagal melakukan transaksi');
  //   }
  
  //   const senderTransactions = currentUserAccount.senderTransactions;
  //   const recipientTransactions = recipientUserAccount.recipientTransactions;
  
  //   const sender = {
  //     usac_account_number: currentUserAccount.usac_account_number,
  //     usac_saldo: currentUserAccount.usac_saldo,
  //     transactions: senderTransactions
  //   };
  //   const recipient = {
  //     usac_account_number: recipientUserAccount.usac_account_number,
  //     usac_saldo: recipientUserAccount.usac_saldo,
  //     transactions: recipientTransactions
  //   };
  
  //   return { sender, recipient };
  // }


  //  async topupUserAccount(
  //   currentUserAccountId: number,
  //   recipientAccountId: number,
  //   amount: number,
  // ): Promise<{
  //   sender: { usac_account_number: string; usac_saldo: string };
  //   recipient: { usac_account_number: string; usac_saldo: string };
  // }> {
  //   // Mendapatkan data saldo pengirim dan penerima
  //   const currentUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: currentUserAccountId },
  //   });
  //   const recipientUserAccount = await this.userAccountModal.findOne({
  //     where: { usac_account_number: recipientAccountId },
  //   });

  //   if (!currentUserAccount || !recipientUserAccount) {
  //     throw new Error('Akun pengguna tidak ditemukan');
  //   }

  //   const currentUserAccountBalance = Number(currentUserAccount.usac_saldo);
  //   const recipientUserAccountBalance = Number(recipientUserAccount.usac_saldo);
    

  //   if (currentUserAccountBalance < amount) {
  //     throw new Error('Saldo tidak mencukupi');
  //   }
  //   // Update saldo pengirim dan penerima
  //   currentUserAccount.usac_saldo = (
  //     currentUserAccountBalance - Number(amount)
  //   ).toString();
  //   recipientUserAccount.usac_saldo = (
  //     recipientUserAccountBalance + Number(amount)
  //   ).toString();
  //   console.log(recipientUserAccount)
  //   // Simpan perubahan ke database
  //   await currentUserAccount.save();
  //   await recipientUserAccount.save();

  //   const sender = {
  //     usac_account_number: currentUserAccount.usac_account_number,
  //     usac_saldo: currentUserAccount.usac_saldo,
  //   };
  //   const recipient = {
  //     usac_account_number: recipientUserAccount.usac_account_number,
  //     usac_saldo: recipientUserAccount.usac_saldo,
  //   };

  //   return { sender, recipient };
  // }




  // async createBookingAndResto(
  //   createBookingDto: CreateBookingOrderDto,
  //   createRestoDto: CreateOrderMenuDto,
  // ): Promise<any> {
  //   let booking = null;
  //   let resto = null;
  //   let transaction = null;
  //   const transactionData = {
  //     debit: createBookingDto.total_amount,
  //     credit: ,
  //     type: '',
  //     note: '',
  //     sourceId: null,
  //     targetId: null,
  //   };

  //   // Create booking
  //   if (createBookingDto.order_number) {
  //     booking = await this.bookingService.createBooking(createBookingDto);

  //     // Create payment transaction for booking
  //     transactionData.type = 'TBR';
  //     transactionData.note = `Transfer Booking for booking ${booking.id}`;
  //     transactionData.sourceId = booking.id;
  //     transaction = await this.paymentTransactionModel.createPaymentTransaction(
  //       transactionData,
  //     );
  //   }

  //   // Create resto
  //   if (createRestoDto.orme_order_number) {
  //     resto = await this.orderMenusModel.createResto(createRestoDto);

  //     // Create payment transaction for resto
  //     transactionData.type = 'ORM';
  //     transactionData.note = `Order Menu for resto ${resto.id}`;
  //     transactionData.targetId = resto.id;
  //     transaction = await this.paymentTransactionModel.createPaymentTransaction(
  //       transactionData,
  //     );
  //   }

  //   if (!booking && !resto) {
  //     throw new Error('Neither booking nor resto is created');
  //   }

  //   return {
  //     booking,
  //     resto,
  //     transaction,
  //   };
  // }

  // async processPayment(orderNumber: string, amount: number, userId: number): Promise<payment_transaction> {
  //   const userAccount = await this.userAccountModal.findOne({ where: { usac_user_id: userId } });
  //   const bookingOrder = await this.bookingOrderModel.findOne({ where: { boor_order_number: orderNumber } });
  //   const orderMenu = await this.orderMenusModel.findOne({ where: { orme_order_number: orderNumber } });

  //   const paymentTransaction = new payment_transaction();
  //   paymentTransaction.patr_debet = String();
  //   paymentTransaction.patr_credit = String(amount);
  //   paymentTransaction.patr_type = bookingOrder ? 'TRB' : 'ORM';
  //   paymentTransaction.patr_note = bookingOrder ? 'Transfer Booking' : 'Order Menu';
  //   paymentTransaction.patr_boor_order_number = bookingOrder ? bookingOrder.boor_order_number : null;
  //   paymentTransaction.patr_orme_order_number = orderMenu ? orderMenu.orme_order_number : null;
  //   paymentTransaction.patr_source_id = userAccount.usac_account_number;
  //   paymentTransaction.patr_target_id = userAccount.usac_account_number;
  //   paymentTransaction.patr_user_id = userAccount.usac_user_id;
  //   const savedTransaction = await this.paymentTransactionModel.save(paymentTransaction);

  //   userAccount.usac_saldo += amount;
  //   await this.userAccountModal.save(userAccount);

  //  // Ambil kembali data transaksi dari basis data
  //  const transaction = await this.paymentTransactionModel.findOne({ where: { patr_id: savedTransaction.id } });

  // // Kembalikan nilai transaksi
  // return transaction;

  // }


  // async paymentHotel(createBooking: CreateBookingOrderDto,
  //   createResto: CreateOrderMenuDto, createPaymentTransaction:CreatePaymentTransactionDto): Promise<any>{
  //   try {
  //     let transactionData = null;
  //   if (booking_orders) {
  //     transactionData = {
  //       debit: 0,
  //       credit: booking_orders.boor_total_amount,
  //       type: 'TBR',
  //       note: 'Transfer Booking',
  //       boorOrderNumber: booking_orders.boor_order_number,
  //     };
  //   } else if (order_menus) {
  //     transactionData = {
  //       debit: 0,
  //       credit: order_menus.orme_order_number,
  //       type: 'ORM',
  //       note: 'Order Menu',
  //       ormeOrderNumber: order_menus.orme_order_number,
  //     };
  //   }

  //        // Lakukan proses create transaction di dalam blok kondisi
  //   const createdTransaction = await this.paymentTransactionModel.create(transactionData);

  //   // Jika transaksi berhasil dibuat, lanjutkan proses create booking atau resto
  //   const createdBooking = await this.bookingOrderModel.create({
  //     ...transactionData,
  //     paymentTransactionId: createdTransaction.id,
  //   });

  //   const createdResto = await this.orderMenusModel.create({
  //     ...transactionData,
  //     paymentTransactionId: createdTransaction.id,
  //   });

  //   // Kembalikan hasil create booking dan resto
  //   return { createdBooking, createdResto };
  // } else {
  //   // Jika boor_order_number atau orme_order_number tidak ada, kembalikan null
  //   return null;
  
  //   } catch (error) {
      
    
  // }



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
        



      
      // let transactionData = null;
      // if (createBooking) {
      //   transactionData = {
      //     debit: createBooking.total_amount,
      //     credit: createBooking.total_amount,
      //     type: 'TBR',
      //     note: 'Transfer Booking',
      //     boorOrderNumber: createBooking.order_number,
      //   };
      // } else if (createResto) {
      //   transactionData = {
      //     debit: createResto.orme_total_amount,
      //     credit: createResto.orme_total_amount,
      //     type: 'ORM',
      //     note: 'Order Menu',
      //     ormeOrderNumber: createResto.orme_order_number,
      //   };
      // }
  
      // Lakukan proses create transaction di dalam blok kondisi
      // console.log(createPaymentTransaction)
      // const createdTransaction = await this.paymentTransactionModel.create({
      //   patr_debet : transactionData.createResto.debit
      // });
      // // Jika transaksi berhasil dibuat, lanjutkan proses create booking atau resto
      // if (createBooking) {
      //   const createdBooking = await this.bookingOrderModel.create({
      //     ...transactionData,
      //     paymentTransactionId: createdTransaction.id,
      //   });
      //   return createdBooking;
      // } else if (createResto) {
      //   const createdResto = await this.paymentTransactionModel.create({
      //     ...transactionData,
      //     paymentTransactionId: createdTransaction.id,
      //   });
      //   return createdResto;
      // }
      // return transactionData
              // Tangkap dan keluarkan error yang terjadi

    
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
          patr_orme_order_number: null,
          patr_boor_order_number:null,
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

    
    // async findAll(getData, createdTransactionPengirim, recipientUserAccount) {
    //   const getTransaction = await this.paymentTransactionModel.findAll( {
    //     transactionNumber: getData.patr_trx_number,
    //      txtDate: getData.patr_modified_date,
    //      debet:getData.patr_debet,
    //      credit: getData.patr_credit,
    //      note: getData.patr_note,
    //      orderNumber: (getData.patr_boor_order_number? getData.patr_boor_order_number:'')+` `+(getData.patr_orme_order_number? getData.patr_orme_order_number:' '),
    //      pengirim: getData.patr_source_id,
    //      penerima: getData.patr_target_id,
    //      transactionRef: getData.patr_trx_number_ref,
    //      type: getData.patr_type,
    //      user: getData.patr_user_id
    //   });
    //   return getTransaction;
    // }




// async findAll(getData: any, createdTransactionPengirim: any, recipientUserAccount: any) {
//   const getTransaction = await this.paymentTransactionModel.findAll({
//     where: {
//       transactionNumber: String(getData.patr_trx_number),
//       txtDate: getData.patr_modified_date,
//       debit: getData.patr_debet,
//       credit: getData.patr_credit,
//       note: getData.patr_note,
//       orderNumber: `${getData.patr_boor_order_number || ''} ${getData.patr_orme_order_number || ''}`,
//       sender: getData.patr_source_id,
//       receiver: getData.patr_target_id,
//       transactionRef: createdTransactionPengirim.patr_trx_number,
//       type: getData.patr_type,
//       user: recipientUserAccount.usac_user_id,
//     },
//     model: payment_transaction, // menggunakan model payment_transaction
//   });
//   return getTransaction;
// }

// async findAll(): Promise<payment_transaction[]> {
//   return this.paymentTransactionModel.findAll({
//     attributes: [
//       'patr_trx_number', 
//       'patr_modified_date',
//       'patr_debet',
//       'patr_credit',
//       'patr_note',
//       'patr_source_id',
//       'patr_target_id',
//       'patr_trx_number_ref',
//       'patr_type',
//       'patr_user_id'
//     ],
//   });

  // }

  async findAll(): Promise<payment_transaction[]> {
    return this.paymentTransactionModel.findAll({
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
        'patr_user_id',
      ],
    });
  }
  

    
    
    // {
         
    //   order_number: (obj.patr_orme_order_number ?obj.patr_orme_order_number : '' )  + ` ` + (obj.patr_boor_order_number ? obj.patr_boor_order_number : '')
    // }


  


}

  
  











  

//   findOne(id: number) {
//     return `This action returns a #${id} paymentTransaction`;
//   }

//   update(id: number, updatePaymentTransactionDto: UpdatePaymentTransactionDto) {
//     return `This action updates a #${id} paymentTransaction`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} paymentTransaction`;
//   }
// }


