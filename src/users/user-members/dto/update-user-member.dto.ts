import { IsNotEmpty } from 'class-validator';

export class UpdateUserMemberDto {
  usme_user_id: number;
  @IsNotEmpty()
  usme_memb_name: 'SILVER' | 'GOLD' | 'VIP' | 'WIZARD';
  usme_promote_date: Date;

  @IsNotEmpty()
  usme_points: number;

  @IsNotEmpty()
  usme_type: 'default' | 'expired';
}
