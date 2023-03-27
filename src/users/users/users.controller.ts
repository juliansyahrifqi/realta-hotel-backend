import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Param,
  HttpStatus,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpGuestDto } from './dto/signup-guest.dto';
import { SignUpEmployeeDto } from './dto/signup-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { existsSync, unlink } from 'fs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const result = await this.usersService.getUserJoinById(+id);

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

  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('user_photo_profile', {
      storage: diskStorage({
        destination: './uploads/image/users',
        filename(req, file, callback) {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
          callback(
            null,
            uniqueSuffix + '.' + file.originalname.split('.').pop(),
          );
        },
      }),
    }),
  )
  async updateUsers(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const users = await this.usersService.getUserById(+id);

    if (users === null) {
      return { status: 'Not Found', message: `Product doesn't exists` };
    }

    const oldImage = users.user_photo_profile;

    let finalImageUrl: string;

    console.log(oldImage);

    if (file || req.file) {
      if (
        existsSync('uploads/image/users/' + oldImage) &&
        oldImage !== 'default.jpg'
      ) {
        unlink('uploads/image/users/' + oldImage, (err) => {
          if (err) throw err;
        });
      }

      finalImageUrl = req.file.filename;
    } else {
      finalImageUrl = oldImage;
    }

    return await this.usersService.updateUser(+id, {
      ...updateUserDto,
      user_photo_profile: finalImageUrl,
    });
  }
}
