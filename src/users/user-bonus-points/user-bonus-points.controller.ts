import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserBonusPointsService } from './user-bonus-points.service';
import { CreateUserBonusPointDto } from './dto/create-user-bonus-point.dto';
import { UpdateUserBonusPointDto } from './dto/update-user-bonus-point.dto';

@Controller('users/bonusPoints')
export class UserBonusPointsController {
  constructor(
    private readonly userBonusPointsService: UserBonusPointsService,
  ) {}

  @Post('create')
  async create(@Body() createUserBonusPointDto: CreateUserBonusPointDto) {
    try {
      await this.userBonusPointsService.create({
        ...createUserBonusPointDto,
        ubpo_created_on: new Date(),
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'User Bonus Point success created',
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Get(':id')
  async getUserBonusPoints(@Param('id') id: string) {
    try {
      const result = await this.userBonusPointsService.getUserBonusPoints(+id);

      if (result.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Bonus Points is Not Found',
          data: result,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User Bonus Points is found',
        data: result,
      };
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserBonusPointDto: UpdateUserBonusPointDto,
  ) {
    try {
      await this.userBonusPointsService.updateUserBonusPoints(+id, {
        ...updateUserBonusPointDto,
        ubpo_created_on: new Date(),
      });

      return { statusCode: HttpStatus.OK, message: 'User Bonus Point success' };
    } catch (e) {
      return { statusCode: HttpStatus.OK, message: e };
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userBonusPointsService.remove(+id);
  // }
}
