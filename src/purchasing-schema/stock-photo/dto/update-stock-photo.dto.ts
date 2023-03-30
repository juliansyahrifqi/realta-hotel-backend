import { PartialType } from '@nestjs/mapped-types';
import { CreateStockPhotoDto } from './create-stock-photo.dto';

export class UpdateStockPhotoDto extends PartialType(CreateStockPhotoDto) {}
