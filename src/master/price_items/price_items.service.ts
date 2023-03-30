import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { price_items } from '../../../models/masterSchema';
import { CreatePriceItemDto } from './dto/create-price_item.dto';
import { UpdatePriceItemDto } from './dto/update-price_item.dto';

@Injectable()
export class PriceItemsService {
  constructor(
    @InjectModel(price_items)
    private priceItemsModel: typeof price_items,
  ) {}

  async create(createPriceItemDto: CreatePriceItemDto): Promise<any> {
    try {
      const newPriceItem = await this.priceItemsModel.create(
        createPriceItemDto,
      );
      return { message: 'Data created', data: newPriceItem };
    } catch (error) {
      return { message: 'Error creating data', error: error.message };
    }
  }

  async findAll(page = 1, limit = 10): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const priceItems = await this.priceItemsModel.findAll({
        limit,
        offset,
      });
      const count = await this.priceItemsModel.count();
      const totalPages = Math.ceil(count / limit);
      const currentPage = page > totalPages ? totalPages : page;

      return {
        message: 'Data found',
        data: priceItems,
        pagination: {
          totalPages,
          currentPage,
          totalItems: count,
        },
      };
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const priceItem = await this.priceItemsModel.findByPk(id);
      if (priceItem) {
        return { message: 'Data found', data: priceItem };
      } else {
        return { message: 'Data not found' };
      }
    } catch (error) {
      return { message: 'Error fetching data', error: error.message };
    }
  }

  async findAllSearch(searchQuery: string): Promise<any> {
    try {
      const data = await this.priceItemsModel.findAll({
        where: {
          prit_name: { [Op.like]: `%${searchQuery}%` },
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(
    id: number,
    updatePriceItemDto: UpdatePriceItemDto,
  ): Promise<any> {
    try {
      const priceItem = await this.priceItemsModel.findByPk(id);
      await priceItem.update(updatePriceItemDto);
      return { message: 'Data updated', data: priceItem };
    } catch (error) {
      return { message: 'Error updating data', error: error.message };
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const priceItem = await this.priceItemsModel.findByPk(id);
      await priceItem.destroy();
      return { message: 'Data deleted' };
    } catch (error) {
      return { message: 'Error deleting data', error: error.message };
    }
  }
}
