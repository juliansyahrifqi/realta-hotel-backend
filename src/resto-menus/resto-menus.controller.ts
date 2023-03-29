import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { UpdateRestoMenuDto } from './dto/create-update-resto-menu.dto';
import { RestoMenusService } from './resto-menus.service';
import { resto_menus } from 'models/restoSchema';

@Controller('resto-menus')
export class RestoMenusController {
  constructor(private readonly restoMenusService: RestoMenusService) {}

  @Post()
  async create(
    @Body() createRestoMenuDto: CreateRestoMenuDto,
  ): Promise<resto_menus> {
    return this.restoMenusService.create(createRestoMenuDto);
  }

  @Get()
  async findAll(@Query() query: { page?: number; limit?: number }) {
    const result = await this.restoMenusService.findAll(query);
    return {
      data: result.rows,
      totalCount: result.count,
      currentPage: query.page,
      perPage: query.limit,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restoMenusService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRestoMenuDto: UpdateRestoMenuDto,
  ): Promise<[number, resto_menus[]]> {
    return this.restoMenusService.update(id, updateRestoMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restoMenusService.remove(+id);
  }
}
