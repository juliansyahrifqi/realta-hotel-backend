import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpGuestDto } from './dto/signup-guest.dto';
import { SignUpEmployeeDto } from './dto/signup-employee.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const result = await this.usersService.getUserById(+id);

      if (result.length === 0) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User found',
        data: result[0],
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Post('signupGuest')
  async signUpGuest(@Body() signUpGuestDto: SignUpGuestDto) {
    try {
      await this.usersService.signUpGuest(signUpGuestDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Guest success created',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      };
    }
  }

  @Post('signUpEmployee')
  async signUpEmployee(@Body() signUpEmployeeDto: SignUpEmployeeDto) {
    try {
      if (signUpEmployeeDto.password !== signUpEmployeeDto.confirm_password) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password and Confirm Password is not same',
        };
      }

      await this.usersService.signUpEmployee(signUpEmployeeDto);

      return { statusCode: HttpStatus.OK, message: 'Employee success created' };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
