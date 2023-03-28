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
} from '@nestjs/common';
import { CategoryGroupService } from './category_group.service';
import { category_group } from '../../models/master_module';
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
  async findAll(): Promise<category_group[]> {
    return this.categoryGroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<category_group> {
    return this.categoryGroupService.findOne(id);
  }

  // @Post()
  // async create(
  //   @Body() createCategoryGroupDto: CreateCategoryGroupDto,
  // ): Promise<category_group> {
  //   return this.categoryGroupService.create(createCategoryGroupDto);
  // }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('cagro_icon', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryGroupDto: CreateCategoryGroupDto,
  ) {
    
    const createdCategoryGroup = await this.categoryGroupService.create(
      createCategoryGroupDto,
      file,
    );
    return createdCategoryGroup;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryGroupDto: UpdateCategoryGroupDto,
  ): Promise<void> {
    await this.categoryGroupService.update(id, updateCategoryGroupDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.categoryGroupService.delete(id);
  }
}
