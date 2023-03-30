import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  Put,
} from '@nestjs/common';
import { FacilityPhotoService } from './facility-photo.service';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('facility-photos')
export class FacilityPhotoController {
  constructor(private readonly facilityPhotoService: FacilityPhotoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photos', {
      storage: diskStorage({
        destination: './uploads/image/hotel',
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
    @Body() createFacilityPhotoDto: CreateFacilityPhotoDto,
    @UploadedFile() photos: Express.Multer.File,
  ) {
    return this.facilityPhotoService.create(
      response,
      createFacilityPhotoDto,
      photos,
    );
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.facilityPhotoService.findAll(response);
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: number) {
    return this.facilityPhotoService.findOne(response, id);
  }

  @Get('photos/:id')
  async getImage(@Res() res, @Param('id') id) {
    res.sendFile(id, { root: './uploads/image/hotel' });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photos', {
      storage: diskStorage({
        destination: './uploads/image/hotel',
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
    @Body() updateFacilityPhotoDto: UpdateFacilityPhotoDto,
    @UploadedFile() photos: Express.Multer.File,
  ) {
    return this.facilityPhotoService.update(
      response,
      id,
      updateFacilityPhotoDto,
      photos,
    );
  }

  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: number) {
    return this.facilityPhotoService.remove(response, id);
  }
}
