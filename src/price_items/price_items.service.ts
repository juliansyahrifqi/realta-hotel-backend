import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { price_items } from '../../models/master_module';
import { CreatePriceItemDto } from './dto/create-price_item.dto';
import { UpdatePriceItemDto } from './dto/update-price_item.dto';

@Injectable()
export class PriceItemsService {
  constructor(
    @InjectModel(price_items)
    private priceItemsModel: typeof price_items,
  ) {}

  async create(createPriceItemDto: CreatePriceItemDto): Promise<price_items> {
    return await this.priceItemsModel.create(createPriceItemDto);
  }

  async findAll(): Promise<price_items[]> {
    return await this.priceItemsModel.findAll();
  }

  async findOne(id: number): Promise<price_items> {
    return await this.priceItemsModel.findByPk(id);
  }

  async update(
    id: number,
    updatePriceItemDto: UpdatePriceItemDto,
  ): Promise<price_items> {
    const priceItem = await this.priceItemsModel.findByPk(id);
    priceItem.update(updatePriceItemDto);
    return priceItem;
  }

  async remove(id: number): Promise<void> {
    const priceItem = await this.priceItemsModel.findByPk(id);
    priceItem.destroy();
  }
}
