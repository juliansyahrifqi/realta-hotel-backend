import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Get()
  findAll() {
    return this.entityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
