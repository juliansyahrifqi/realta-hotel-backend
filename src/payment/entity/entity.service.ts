import { Injectable } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { InjectModel } from '@nestjs/sequelize';
import { entity } from 'models/paymentSchema';

@Injectable()
export class EntityService {
  constructor( @InjectModel(entity) private entityModel : typeof entity){}

  create(createEntityDto: CreateEntityDto) {
    return 'This action adds a new entity';
  }

  async findAll() {
    try {
      const entities = await this.entityModel.findAll();
      return { data: entities };
    } catch (error) {
      return { error: 'Failed to get banks' };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} entity`;
  }

  update(id: number, updateEntityDto: UpdateEntityDto) {
    return `This action updates a #${id} entity`;
  }

  remove(id: number) {
    return `This action removes a #${id} entity`;
  }
}
