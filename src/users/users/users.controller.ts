import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpGuestDto } from './dto/signup-guest.dto';
import { SignUpEmployeeDto } from './dto/signup-employee.dto';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { QueryTypes } from 'sequelize';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private sequelize: Sequelize,
  ) {}

  @Post('signUpGuest')
  async signUpGuest(@Body() signUpGuestDto: SignUpGuestDto) {
    try {
      await this.usersService.signUpGuest(signUpGuestDto);

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Guest success created',
      };
    } catch (error) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: error };
    }
  }

  @Post('signUpEmployee')
  async signUpEmployee(@Body() signUpEmployeeDto: SignUpEmployeeDto) {
    try {
      // const result = await
      const result = await this.usersService.signUpEmployee(signUpEmployeeDto);

      console.log(result);
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
