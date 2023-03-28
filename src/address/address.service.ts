import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { address } from '../../models/master_module';
// import { addressAttributes } from '../../models/address';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(address)
    private readonly addressModel: typeof address,
  ) {}

  async findAll(): Promise<any> {
    return await address.findAll();
  }

  async findOne(id: number): Promise<address> {
    return this.addressModel.findOne({ where: { addr_id: id } });
  }

  async create(createAddressDto: CreateAddressDto): Promise<address> {
    console.log('Data yang diinput:', createAddressDto);
    const newAddress = await this.addressModel.create(createAddressDto);
    console.log('Data yang disimpan:', newAddress);
    return newAddress;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<[number, address[]]> {
    const [affectedCount, affectedRows] = await this.addressModel.update(
      updateAddressDto,
      {
        where: { addr_id: id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<number> {
    const deleted = await this.addressModel.destroy({ where: { addr_id: id } });
    return deleted;
  }
}
