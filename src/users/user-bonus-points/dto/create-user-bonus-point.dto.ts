import { IsNotEmpty } from 'class-validator';

export class CreateUserBonusPointDto {
  @IsNotEmpty()
  ubpo_user_id: number;

  @IsNotEmpty()
  ubpo_total_points: number;

  @IsNotEmpty()
  ubpo_bonus_type: 'R' | 'P';

  ubpo_created_on: Date;
}
