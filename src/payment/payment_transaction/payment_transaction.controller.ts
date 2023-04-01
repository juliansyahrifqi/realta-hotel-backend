import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { PaymentTransactionService } from './payment_transaction.service';
import { CreatePaymentTransactionDto } from './dto/create-payment_transaction.dto';
import { UpdatePaymentTransactionDto } from './dto/update-payment_transaction.dto';
import { payment_transaction } from 'models/paymentSchema';

@Controller('payment-transaction')
export class PaymentTransactionController {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) {}

  // @Post()
  // async create(@Body('currentUserAccountId') currentUserAccountId: number, @Body('recipientAccountId') recipientAccountId: number, @Body('amount') amount: number) {
  //   const result = await this.paymentTransactionService.topupUserAccount(currentUserAccountId, recipientAccountId, amount);
  //   return result;
  // }

  @Post('payment')
  async paymentHotel(
    @Body() createPaymentTransaction: CreatePaymentTransactionDto,
  ): Promise<any> {
    return this.paymentTransactionService.paymentHotel(
      createPaymentTransaction
    );
  }

    @Post('topup')
  async topUp(
    @Body() createPaymentTransaction: CreatePaymentTransactionDto,
  ): Promise<any> {
    return this.paymentTransactionService.topUp(
      createPaymentTransaction
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTransactionService.validateAccountPayment(id);
  }


  //   @Get()
  //   async findAll(@Param() req: Request, res: Response, getData, createdTransactionPenerima, createdTransactionPengirim){
  //     try {
  //       const getData = req.body.getData;
  //       const createdTransactionPengirim = req.body.createdTransactionPengirim;
  //       const recipientUserAccount = req.body.recipientUserAccount;

  //       const transactions = await this.paymentTransactionService.findAll(
  //         getData,
  //         createdTransactionPengirim,
  //         recipientUserAccount,
  //       );

  //       res.status(200).json({ transactions });
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }
  // }

  // @Get()
  // async findAll(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const getData = req.getData;
  //     const createdTransactionPengirim = req.query.createdTransactionPengirim;
  //     const recipientUserAccount = req.query.recipientUserAccount;

  //     const transactions = await this.paymentTransactionService.findAll(
  //       getData,
  //       createdTransactionPengirim,
  //       recipientUserAccount,
  //     );

  //     res.status(200).json({ transactions });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  @Get()
  async getAllTransactions(): Promise<payment_transaction[]> {
    return this.paymentTransactionService.findAll();
  }






//   @Get()
//   findAll() {
//     return this.paymentTransactionService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.paymentTransactionService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePaymentTransactionDto: UpdatePaymentTransactionDto) {
//     return this.paymentTransactionService.update(+id, updatePaymentTransactionDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.paymentTransactionService.remove(+id);
//   }
}


// transactionNumber: String(getData.patr_trx_number),
// //       txtDate: getData.patr_modified_date,
// //       debit: getData.patr_debet,
// //       credit: getData.patr_credit,
// //       note: getData.patr_note,
// //       orderNumber: `${getData.patr_boor_order_number || ''} ${getData.patr_orme_order_number || ''}`,
// //       sender: getData.patr_source_id,
// //       receiver: getData.patr_target_id,
// //       transactionRef: createdTransactionPengirim.patr_trx_number,
// //       type: getData.patr_type,
// //       user: recipientUserAccount.usac_user_id,
