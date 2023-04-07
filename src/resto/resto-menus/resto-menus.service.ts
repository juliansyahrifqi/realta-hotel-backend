import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { resto_menu_photos, resto_menus } from 'models/restoSchema';
import { CreateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { UpdateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { Op } from 'sequelize';
import { Response } from 'express';

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

  // INI GET ALL COBA
  // async findAllInclude(): Promise<any> {
  //   try {
  //     const result = await resto_menus.findAll({
  //       include: [
  //         {
  //           model: resto_menu_photos,
  //         },
  //       ],
  //     });
  //     return {
  //       status: 200,
  //       message: `Data berhasil ditemukan`,
  //       data: result,
  //     };
  //   } catch (error) {
  //     return { status: 400, message: error };
  //   }
  // }

  // INI GET ALL COBA

  // * HUBUNGAN DENGAN TABLE FACILITIES DARI SCHEMA HOTEL
  async findAllSearch(options: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sort?: string;
  }): Promise<{ rows: resto_menus[]; count: number }> {
    const { page = 1, limit = 5, searchTerm, sort } = options;
    const offset = (page - 1) * limit;
    const whereClause = searchTerm
      ? { reme_name: { [Op.iLike]: `%${searchTerm}%` } }
      : undefined;

    let orderClause;
    if (sort === 'low-to-high') {
      orderClause = [['reme_price', 'ASC']];
    } else if (sort === 'high-to-low') {
      orderClause = [['reme_price', 'DESC']];
    } else {
      orderClause = undefined;
    }

    const result = await this.restoMenuModel.findAndCountAll({
      limit,
      offset,
      include: ['facility', 'resto_menu_photos'],
      where: whereClause,
      order: orderClause,
    });
    return { rows: result.rows, count: result.count };
  }
  // ! HUBUNGAN DENGAN TABLE FACILITIES DARI SCHEMA HOTEL

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

    const updatedRestoMenu = await this.restoMenuModel.findByPk(id, {
      order: [['reme_id', 'ASC']], // tambahkan kondisi pengurutan berdasarkan reme_id ascending
    });

    return [affectedCount, [updatedRestoMenu]];
  }

  async remove(id: number): Promise<void> {
    const restoMenu = await this.findOne(id);
    await restoMenu.destroy();
  }
}
