import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRestoMenuPhotoDto } from './dto/create-resto-menu-photo.dto';
import { UpdateRestoMenuPhotoDto } from './dto/update-resto-menu-photo.dto';
import { resto_menu_photos } from '../../models/resto_module';

@Injectable()
export class RestoMenuPhotosService {
  constructor(
    @InjectModel(resto_menu_photos)
    private readonly restoMenuPhotosModel: typeof resto_menu_photos,
  ) {}

  async create(
    createRestoMenuPhotoDto: CreateRestoMenuPhotoDto,
  ): Promise<resto_menu_photos> {
    return this.restoMenuPhotosModel.create(createRestoMenuPhotoDto);
  }

  // MULTIPLE

  // async createMultiple(
  //   restoMenuPhotos: resto_menu_photos[],
  // ): Promise<resto_menu_photos[]> {
  //   return this.restoMenuPhotosModel.bulkCreate(restoMenuPhotos, {
  //     returning: true,
  //     ignoreDuplicates: true,
  //   });
  // }

  // MULTIPLE

  async findAll(): Promise<resto_menu_photos[]> {
    return this.restoMenuPhotosModel.findAll();
  }

  async findOne(id: number): Promise<resto_menu_photos> {
    return this.restoMenuPhotosModel.findByPk(id);
  }

  async update(
    id: number,
    updateRestoMenuPhotosDto: UpdateRestoMenuPhotoDto,
  ): Promise<[number, resto_menu_photos[]]> {
    const [numAffectedRows, updatedRestoMenuPhotos] =
      await this.restoMenuPhotosModel.update(updateRestoMenuPhotosDto, {
        where: { remp_id: id },
        returning: true,
      });
    return [numAffectedRows, updatedRestoMenuPhotos];
  }

  async delete(id: number): Promise<number> {
    const rowsDeleted = await this.restoMenuPhotosModel.destroy({
      where: { remp_id: id },
    });
    if (rowsDeleted < 1) {
      throw new Error('Product not found');
    }
    return rowsDeleted;
  }
}
