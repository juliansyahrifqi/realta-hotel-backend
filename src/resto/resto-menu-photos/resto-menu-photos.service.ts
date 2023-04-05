import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRestoMenuPhotoDto } from './dto/create-resto-menu-photo.dto';
import { UpdateRestoMenuPhotoDto } from './dto/update-resto-menu-photo.dto';
import { resto_menu_photos } from 'models/restoSchema';

@Injectable()
export class RestoMenuPhotosService {
  constructor(
    @InjectModel(resto_menu_photos)
    private readonly restoMenuPhotosModel: typeof resto_menu_photos,
  ) {}

  async create(
    createRestoMenuPhotosDto: CreateRestoMenuPhotoDto[],
  ): Promise<resto_menu_photos[]> {
    const createdRestoMenuPhotos = [];
    for (const createRestoMenuPhotoDto of createRestoMenuPhotosDto) {
      const createdRestoMenuPhoto = new this.restoMenuPhotosModel(
        createRestoMenuPhotoDto,
      );
      createdRestoMenuPhotos.push(await createdRestoMenuPhoto.save());
    }
    return createdRestoMenuPhotos;
  }

  // * HUBUNGAN ASSOCIATION DENGAN TABLE RESTO_MENUS
  async findAll(): Promise<resto_menu_photos[]> {
    return this.restoMenuPhotosModel.findAll({
      include: 'resto_menu',
    });
  }
  // ! HUBUNGAN ASSOCIATION DENGAN TABLE RESTO_MENUS

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
