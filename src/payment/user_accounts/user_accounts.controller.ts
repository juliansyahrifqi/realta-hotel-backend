import { Controller, Get, Post, Body, Param, Delete, Put, Query, Res, HttpStatus } from '@nestjs/common';
import { UserAccountsService } from './user_accounts.service';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { id } from 'date-fns/locale';
import { Console } from 'console';
import { Response } from 'express';

@Controller('accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) { }

  @Post()
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    const dataUserAccount = this.userAccountsService.create(createUserAccountDto)
    return dataUserAccount
  }

  @Get()
  async findAll(@Query('id') id: any, @Query('metPemUser') metPemUser: any, @Query('rekeningUser') rekeningUser: any) {
    console.log(id)
    return this.userAccountsService.findAll(id, metPemUser, rekeningUser);
  }

  @Get('data')
  async findBFAll() {
    return this.userAccountsService.findBFAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAccountsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserAccountDto: UpdateUserAccountDto) {
    return this.userAccountsService.update(id, updateUserAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAccountsService.delete(id);
  }


  @Get('booking')
  async getListRooms(@Param('metPemUser') metPemUser: string, @Query('rekeningUser') rekeningUser: string, @Query('metPemRealta') metPemRealta: string, @Param('rekeningRealta') rekeningRealta: string, @Res() res: Response) {
    try {
      const dataResponse = this.userAccountsService.findUserAccountAndRealta(metPemUser, rekeningUser, metPemRealta, rekeningRealta)
      return res.json({
        status_code: HttpStatus.OK,
        message: 'success',
        data: dataResponse
      })
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'failed',
      });
    }
  }
}
