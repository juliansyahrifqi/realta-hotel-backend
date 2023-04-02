import { Controller, Body, Param, Put, HttpStatus } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { CreateOrUpdateUserPasswordDto } from './dto/create-update-user-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('users/password')
export class UserPasswordController {
  constructor(private readonly userPasswordService: UserPasswordService) {}

  @Put(':id')
  async createOrUpdate(
    @Param('id') id: string,
    @Body() createOrUpdateUserPasswordDto: CreateOrUpdateUserPasswordDto,
  ) {
    try {
      const user = await this.userPasswordService.findOne(+id);

      if (
        createOrUpdateUserPasswordDto.new_password !==
        createOrUpdateUserPasswordDto.retype_password
      ) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password and Confirm Password is not same',
        };
      }

      if (user !== null && user.uspa_passwordhash !== null) {
        const isCurrentPasswordSame = await bcrypt.compare(
          createOrUpdateUserPasswordDto.current_password,
          user.uspa_passwordhash,
        );

        if (!isCurrentPasswordSame) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Current password is wrong',
          };
        }
      }

      await this.userPasswordService.createOrUpdate(
        +id,
        createOrUpdateUserPasswordDto,
      );

      return { statusCode: HttpStatus.OK, message: 'Password success update' };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }
}
