import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @Post()
  async create(@Body() createBankDto: CreateBankDto) {
    const dataBank = await this.bankService.create(createBankDto)
    return dataBank
  }

  @Get()
  async findAll(@Query('searchTerm') searchTerm?: string) {
    return this.bankService.findAll(searchTerm);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(+id, updateBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.delete(+id);
  }
}
