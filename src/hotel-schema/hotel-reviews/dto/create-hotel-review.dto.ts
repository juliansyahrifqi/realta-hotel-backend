import { IsNotEmpty } from 'class-validator';

export class CreateHotelReviewDto {
  @IsNotEmpty()
  hore_user_review: string;
  @IsNotEmpty()
  hore_rating: number;
  @IsNotEmpty()
  hore_user_id: number;
  @IsNotEmpty()
  hore_hotel_id: number;
}
