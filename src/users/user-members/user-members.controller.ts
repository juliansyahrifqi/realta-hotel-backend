import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserMembersService } from './user-members.service';
import { CreateUserMemberDto } from './dto/create-user-member.dto';
import { UpdateUserMemberDto } from './dto/update-user-member.dto';

@Controller('users/userMembers')
export class UserMembersController {
  constructor(private readonly userMembersService: UserMembersService) {}

  @Post('create')
  async create(@Body() createUserMemberDto: CreateUserMemberDto) {
    try {
      await this.userMembersService.createUserMembers({
        ...createUserMemberDto,
        usme_promote_date: new Date(),
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'User Members success create',
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Get(':id')
  async getUserMember(@Param('id') id: string) {
    try {
      const result = await this.userMembersService.getUserMember(+id);

      if (result === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Members Not Found',
          data: result,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User Members Found',
        data: result,
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Put('update/:id')
  async updateUserMember(
    @Param('id') id: string,
    @Body() updateUserMemberDto: UpdateUserMemberDto,
  ) {
    try {
      await this.userMembersService.updateUserMember(
        +id,
        updateUserMemberDto.usme_memb_name,
        updateUserMemberDto,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'User Members success update',
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userMembersService.remove(+id);
  // }
}
