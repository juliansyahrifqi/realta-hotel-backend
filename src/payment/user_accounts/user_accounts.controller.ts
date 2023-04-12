import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UserAccountsService } from './user_accounts.service';
import { CreateUserAccountDto } from './dto/create-user_account.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { id } from 'date-fns/locale';

@Controller('accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}

  @Post()
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    const dataUserAccount = this.userAccountsService.create(createUserAccountDto)
    return dataUserAccount
  }

  @Get()
  async findAll(@Query('id') id: any)  {
    return this.userAccountsService.findAll(id);
  }

  @Get('data')
  async findBFAll()  {
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
}
