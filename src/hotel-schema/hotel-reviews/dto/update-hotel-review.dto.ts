import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateHotelReviewDto } from './create-hotel-review.dto';

export class UpdateHotelReviewDto extends PartialType(CreateHotelReviewDto) {
  @IsNotEmpty()
  hore_user_review: string;
  @IsNotEmpty()
  hore_rating: number;
}
