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

@Controller('facility-photos')
export class FacilityPhotoController {
  constructor(private readonly facilityPhotoService: FacilityPhotoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photos', {
      storage: diskStorage({
        destination: './Upload/hotelSchema',
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
    @Body() createFacilityPhotoDto: CreateFacilityPhotoDto,
    @UploadedFile() photos: Express.Multer.File,
  ) {
    return this.facilityPhotoService.create(createFacilityPhotoDto, photos);
  }

  @Get()
  findAll() {
    return this.facilityPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facilityPhotoService.findOne(id);
  }

  @Get('photos/:id')
  async getImage(@Res() res, @Param('id') id) {
    res.sendFile(id, { root: './Upload/hotelSchema' });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('photos', {
      storage: diskStorage({
        destination: './Upload/hotelSchema',
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
    @Param('id') id: number,
    @Body() updateFacilityPhotoDto: UpdateFacilityPhotoDto,
    @UploadedFile() photos: Express.Multer.File,
  ) {
    return this.facilityPhotoService.update(id, updateFacilityPhotoDto, photos);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityPhotoService.remove(+id);
  }
}
