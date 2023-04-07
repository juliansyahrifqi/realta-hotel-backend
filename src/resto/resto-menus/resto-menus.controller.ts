import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { UpdateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { RestoMenusService } from './resto-menus.service';
import { resto_menus } from 'models/restoSchema';
// import { extname, join, basename } from 'path';
// import { Response } from 'express';

@Controller('resto-menus')
export class RestoMenusController {
  constructor(private readonly restoMenusService: RestoMenusService) {}

  // * CREATE DATA RESTO_MENUS
  @Post()
  async create(
    @Body() createRestoMenuDto: CreateRestoMenuDto,
  ): Promise<resto_menus> {
    return this.restoMenusService.create(createRestoMenuDto);
  }
  // ! CREATE DATA RESTO_MENUS

  // * MENAMPILKAN SEMUA DATA DENGAN HALAMAN YANG SUDAH DIBERI PAGINATION
  @Get()
  async findAllSearch(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('searchTerm') searchTerm?: string,
    @Query('sort') sort?: 'low-to-high' | 'high-to-low',
  ) {
    const options = { page, limit, searchTerm, sort };
    const { rows, count } = await this.restoMenusService.findAllSearch(options);
    return { data: rows, total: count };
  }
  // ! MENAMPILKAN SEMUA DATA DENGAN HALAMAN YANG SUDAH DIBERI PAGINATION

  // * MENAMPILKAN DATA BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restoMenusService.findOne(+id);
  }
  // ! MENAMPILKAN DATA BY ID

  // // * MENAMPILKAN GAMBAR DARI DATA PHOTO BY NAMA FILE GAMBARNYA
  // @Get('photo')
  // findAll(): Promise<any[]> {
  //   return this.restoMenusService.findAllInclude();
  // }
  // // ! MENAMPILKAN GAMBAR DARI DATA PHOTO BY NAMA FILE GAMBARNYA

  // * EDIT DAN UPDATE RESTO_MENUS
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRestoMenuDto: UpdateRestoMenuDto,
  ): Promise<[number, resto_menus[]]> {
    return this.restoMenusService.update(id, updateRestoMenuDto);
  }
  // ! EDIT DAN UPDATE RESTO_MENUS

  // * DELETE BY ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restoMenusService.remove(+id);
  }
  // ! DELETE BY ID
}
