/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryGroupService } from './category_group.service';
import { category_group } from '../../models/masterSchema';
import { CreateCategoryGroupDto } from './dto/create-category_group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category_group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('category-group')
export class CategoryGroupController {
  constructor(private categoryGroupService: CategoryGroupService) {}
  // @Get(':path')
  // async serveFile(@Param('path') path: string, @Res() res: Response) {
  //   res.sendFile(path, { root: 'uploads' });
  // }
  @Get()
  async findAll(): Promise<any> {
    return this.categoryGroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.categoryGroupService.findOne(id);
  }

  // @Post()
  // async create(
  //   @Body() createCategoryGroupDto: CreateCategoryGroupDto,
  // ): Promise<category_group> {
  //   return this.categoryGroupService.create(createCategoryGroupDto);
  // }
  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('cagro_icon', {
  //     storage: diskStorage({
  //       destination: './files',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const filename = `${uniqueSuffix}-${file.originalname}`;
  //         cb(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // async create(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() createCategoryGroupDto: CreateCategoryGroupDto,
  // ) {

  //   const createdCategoryGroup = await this.categoryGroupService.create(
  //     createCategoryGroupDto,
  //     file,
  //   );
  //   return createdCategoryGroup;
  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('cagro_icon', {
      storage: diskStorage({
        destination: './uploads/image/master',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() createCategoryGroupDto: CreateCategoryGroupDto,
  ): Promise<any> {
    const product = await this.categoryGroupService.create(
      createCategoryGroupDto,
      image,
    );
    return product;
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateCategoryGroupDto: UpdateCategoryGroupDto,
  // ): Promise<void> {
  //   await this.categoryGroupService.update(id, updateCategoryGroupDto);
  // }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('cagro_icon', {
      storage: diskStorage({
        destination: './uploads/image/master',
        filename: function (req, file, cb) {
          const uniqueSuffix = Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async updateProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateCategoryGroupDto: UpdateCategoryGroupDto,
    @Param('id') id: string,
  ): Promise<any> {
    const product = await this.categoryGroupService.update(
      id,
      updateCategoryGroupDto,
      image,
    );
    return product;
  }

  //   @Delete(':id')
  //   async delete(@Param('id') id: number): Promise<void> {
  //     await this.categoryGroupService.delete(id);
  //   }
  // }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.categoryGroupService.remove(+id);
  }
}
