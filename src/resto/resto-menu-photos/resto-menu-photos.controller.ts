import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRestoMenuPhotoDto } from './dto/create-resto-menu-photo.dto';
import { UpdateRestoMenuPhotoDto } from './dto/update-resto-menu-photo.dto';
import { resto_menu_photos } from 'models/restoSchema';
import { RestoMenuPhotosService } from './resto-menu-photos.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, basename } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('resto-menu-photos')
export class RestoMenuPhotosController {
  constructor(
    private readonly restoMenuPhotosService: RestoMenuPhotosService,
  ) {}
  // * MENAMPILKAN SEMUA DATA PHOTO
  @Get()
  async findAll(): Promise<resto_menu_photos[]> {
    return this.restoMenuPhotosService.findAll();
  }
  // ! MENAMPILKAN SEMUA DATA PHOTO

  // * UPLOAD/CREATE PHOTO MULTIPLE BISA SINGLE JUGA
  @Post()
  @UseInterceptors(
    FilesInterceptor('remp_photo_filename', 10, {
      storage: diskStorage({
        destination: './uploads/image/resto',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createRestoMenuPhotosDto: CreateRestoMenuPhotoDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req: any,
  ): Promise<resto_menu_photos[]> {
    if (!images || images.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const restomenuPhotos = images.map((image) => {
      const fileName = image.filename;
      const fileUrl = `${req.protocol}://${req.get(
        'host',
      )}/resto-menu-photos/image/src/${fileName}`;
      return {
        ...createRestoMenuPhotosDto,
        remp_thumbnail_filename: `${image.originalname}`,
        remp_photo_filename: `${fileName}`,
        remp_url: fileUrl,
      };
    });
    return this.restoMenuPhotosService.create(restomenuPhotos);
  }
  // ! UPLOAD/CREATE PHOTO MULTIPLE BISA SINGLE JUGA

  // * MENAMPILKAN DATA PHOTO BY ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<resto_menu_photos> {
    const restoMenuPhoto = await this.restoMenuPhotosService.findOne(id);
    if (!restoMenuPhoto) {
      throw new NotFoundException(`Resto menu photo with ID ${id} not found`);
    }
    return restoMenuPhoto;
  }
  // ! MENAMPILKAN DATA PHOTO BY ID

  // * MENAMPILKAN GAMBAR DARI DATA PHOTO BY NAMA FILE GAMBARNYA
  @Get('image/src/:filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = join(process.cwd(), 'uploads/image/resto', filename);
    return res.sendFile(imagePath);
  }
  // ! MENAMPILKAN GAMBAR DARI DATA PHOTO BY NAMA FILE GAMBARNYA

  // * MENGEDIT DAN UPDATE DATA PHOTO
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('remp_photo_filename', {
      storage: diskStorage({
        destination: './uploads/image/resto',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updateRestoMenuPhotosDto: UpdateRestoMenuPhotoDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<[number, resto_menu_photos[]]> {
    if (!file || !file.filename) {
      throw new BadRequestException('No file uploaded');
    }
    const fileName = file.filename;
    const finalImageURL =
      req.protocol +
      '://' +
      req.get('host') +
      '/resto-menu-photos/image/' +
      file.filename;
    const restomenuPhotos = {
      ...updateRestoMenuPhotosDto,
      remp_thumbnail_filename: `${file.originalname}`,
      remp_photo_filename: `${fileName}`,
      remp_url: finalImageURL,
    };
    const existingProduct = await this.restoMenuPhotosService.findOne(id);
    if (existingProduct && existingProduct.remp_photo_filename) {
      const imagePath = join(
        'uploads',
        basename(existingProduct.remp_photo_filename),
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    return this.restoMenuPhotosService.update(id, restomenuPhotos);
  }
  // ! MENGEDIT DAN UPDATE DATA PHOTO

  // * DELETE DATA PHOTO DAN GAMBAR BERDASARKAN ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    const restomenuPhotos = await this.restoMenuPhotosService.findOne(id);
    if (restomenuPhotos && restomenuPhotos.remp_photo_filename) {
      const imagePath = join(
        'uploads/image/resto',
        basename(restomenuPhotos.remp_photo_filename),
      );
      fs.unlinkSync(imagePath);
    }
    return this.restoMenuPhotosService.delete(id);
  }
}
// ! DELETE DATA PHOTO DAN GAMBAR BERDASARKAN ID

// CATATAN SEMUA YANG ADA DI CONTROLLER BERELASI DENGAN SERVICE

//  @ForeignKey(() => resto_menu_photos)
