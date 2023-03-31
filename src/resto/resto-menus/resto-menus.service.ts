import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { resto_menus } from 'models/restoSchema';
import { CreateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { UpdateRestoMenuDto } from './dto/create-update-resto-menu.dto';

@Injectable()
export class RestoMenusService {
  constructor(
    @InjectModel(resto_menus)
    private readonly restoMenuModel: typeof resto_menus,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createRestoMenuDto: CreateRestoMenuDto): Promise<resto_menus> {
    const now = new Date();
    const newData = {
      ...createRestoMenuDto,
      reme_modified_date: now,
    };
    return this.restoMenuModel.create(newData);
  }

  async findAll(options: { page?: number; limit?: number }): Promise<{
    rows: resto_menus[];
    count: number;
  }> {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;
    const result = await this.restoMenuModel.findAndCountAll({
      limit,
      offset,
      include: 'facility',
    });
    return { rows: result.rows, count: result.count };
  }

  async findOne(id: number): Promise<resto_menus> {
    return await this.restoMenuModel.findByPk(id);
  }

  async update(
    id: number,
    updateRestoMenuDto: UpdateRestoMenuDto,
  ): Promise<[number, resto_menus[]]> {
    const restoMenusUpdate = await this.restoMenuModel.findByPk(id);

    if (!restoMenusUpdate)
      throw new Error(`Resto Menu with id ${id} not found.`);

    const now = new Date();
    const newDate = { ...updateRestoMenuDto, reme_modified_date: now };

    const [affectedCount, affectedRows] = await this.restoMenuModel.update(
      newDate,
      {
        where: { reme_id: id },
        returning: true,
      },
    );

    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const restoMenu = await this.findOne(id);
    await restoMenu.destroy();
  }
}
