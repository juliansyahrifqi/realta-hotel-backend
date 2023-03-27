/* eslint-disable prettier/prettier */
export class CreateRestoMenuDto {
  reme_name: string;
  reme_description: string;
  reme_price: string;
  reme_status: string;
}

export class UpdateRestoMenuDto {
  reme_name?: string;
  reme_description?: string;
  reme_price?: string;
  reme_status?: string;
}
