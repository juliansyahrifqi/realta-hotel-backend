// members.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDto } from './dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.membersService.findAll();
  }

  @Get(':memb_name')
  async findOne(@Param('memb_name') memb_name: string): Promise<any> {
    return this.membersService.findOne(memb_name);
  }

  @Post()
  async create(@Body() createMembersDto: CreateMembersDto): Promise<any> {
    return this.membersService.create(createMembersDto);
  }

  @Put(':memb_name')
  async update(
    @Param('memb_name') memb_name: string,
    @Body() updateMembersDto: CreateMembersDto,
  ): Promise<any> {
    return this.membersService.update(memb_name, updateMembersDto);
  }

  @Delete(':memb_name')
  async delete(@Param('memb_name') memb_name: string): Promise<any> {
    return this.membersService.delete(memb_name);
  }
}
