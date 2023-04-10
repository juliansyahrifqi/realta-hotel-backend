import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { address, city } from '../../../models/masterSchema';
// import { addressAttributes } from '../../models/address';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(address)
    private readonly addressModel: typeof address,
    @InjectModel(city)
    private cityModel: typeof city,
  ) {}

  async findAll(): Promise<any> {
    try {
      const result = await address.findAll();
      return { message: 'Data retrieved successfully', data: result };
    } catch (error) {
      return { message: 'Error retrieving data', error };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const result = await this.addressModel.findOne({
        where: { addr_id: id },
      });
      if (!result) {
        return { message: `Address with ID ${id} not found` };
      }
      return result;
    } catch (error) {
      return { message: 'Error retrieving data', error };
    }
  }

  async create(createAddressDto: CreateAddressDto): Promise<any> {
    try {
      console.log('Data yang diinput:', createAddressDto);
      const newAddress = await this.addressModel.create(createAddressDto);
      console.log('Data yang disimpan:', newAddress);
      return { message: 'Data created successfully', data: newAddress };
    } catch (error) {
      return { message: 'Error creating data', error };
    }
  }

  async getCityById(id: number): Promise<any> {
    const city = await this.addressModel.findOne({
      include: [
        {
          model: this.cityModel,
        },
      ],
      where: { addr_id: id },
    });
    return city;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<any> {
    try {
      const [affectedCount, affectedRows] = await this.addressModel.update(
        updateAddressDto,
        {
          where: { addr_id: id },
          returning: true,
        },
      );
      if (affectedCount === 0) {
        return { message: `Address with ID ${id} not found` };
      }
      return { message: 'Data updated successfully', data: affectedRows };
    } catch (error) {
      return { message: 'Error updating data', error };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const deleted = await this.addressModel.destroy({
        where: { addr_id: id },
      });
      if (deleted === 0) {
        return { message: `Address with ID ${id} not found` };
      }
      return {
        message: 'Data deleted successfully',
        data: `Data dengan ${id} found`,
      };
    } catch (error) {
      return { message: 'Error deleting data', error };
    }
  }
}
