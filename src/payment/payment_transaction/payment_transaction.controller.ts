import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { PaymentTransactionService } from './payment_transaction.service';
import { CreatePaymentTransactionDto } from './dto/create-payment_transaction.dto';

@Controller('transaction')
export class PaymentTransactionController {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) { }

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

  // @Get()
  // async getAllTransactions(): Promise<payment_transaction[]> {
  //   return this.paymentTransactionService.findAll();
  // }
  @Get()
  findAll(@Query('search') search: any, @Query('page') page: any, @Query('limit') limit: any, @Query('type') type: any, @Query('id') id: any) {
    return this.paymentTransactionService.findAll(search, page, limit, type, id);
  }

  @Delete(':idTransaction')
  deleteTransaction(@Param('idTransaction') idTransaction: any) {
    try {

    } catch (error) {
      return error
    }
  }







}

