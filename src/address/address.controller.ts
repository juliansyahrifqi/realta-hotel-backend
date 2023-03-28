import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
// import { address } from '../../models/master_module';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.addressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.addressService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<any> {
    return this.addressService.create(createAddressDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<[number, any]> {
    return this.addressService.update(Number(id), updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.addressService.remove(Number(id));
  }
}
