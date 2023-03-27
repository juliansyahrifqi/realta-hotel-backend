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

@Controller('resto-menus')
export class RestoMenusController {
  constructor(private readonly restoMenusService: RestoMenusService) {}

  @Post()
  create(@Body() createRestoMenuDto: CreateRestoMenuDto) {
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
  update(
    @Param('id') id: string,
    @Body() updateRestoMenuDto: UpdateRestoMenuDto,
  ) {
    return this.restoMenusService.update(+id, updateRestoMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restoMenusService.remove(+id);
  }
}
