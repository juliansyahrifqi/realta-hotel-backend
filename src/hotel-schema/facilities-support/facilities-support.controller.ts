import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FacilitiesSupportService } from './facilities-support.service';
import { CreateFacilitiesSupportDto } from './dto/create-facilities-support.dto';
import { UpdateFacilitiesSupportDto } from './dto/update-facilities-support.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('facilities-support')
export class FacilitiesSupportController {
  constructor(
    private readonly facilitiesSupportService: FacilitiesSupportService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('icons', {
      storage: diskStorage({
        destination: './uploads/icons/hotel',
        filename(req, file, cb) {
          const finalName = Array(20)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          let namaExt = file.originalname.split('.')[1];
          cb(null, `${finalName}.${namaExt}`);
        },
      }),
    }),
  )
  create(
    @Res() response: Response,
    @Body() createFacilitiesSupportDto: CreateFacilitiesSupportDto,
    @UploadedFile() icons: Express.Multer.File,
  ) {
    return this.facilitiesSupportService.create(
      response,
      createFacilitiesSupportDto,
      icons,
    );
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.facilitiesSupportService.findAll(response);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: number) {
    return this.facilitiesSupportService.findOne(response, id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('icons', {
      storage: diskStorage({
        destination: './uploads/icons/hotel',
        filename(req, file, cb) {
          const finalName = Array(20)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          let namaExt = file.originalname.split('.')[1];
          cb(null, `${finalName}.${namaExt}`);
        },
      }),
    }),
  )
  update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateFacilitiesSupportDto: UpdateFacilitiesSupportDto,
    @UploadedFile() icons: Express.Multer.File,
  ) {
    return this.facilitiesSupportService.update(
      response,
      id,
      updateFacilitiesSupportDto,
      icons,
    );
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.facilitiesSupportService.remove(response, id);
  }
}
