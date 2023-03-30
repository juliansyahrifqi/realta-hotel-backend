import { PartialType } from '@nestjs/mapped-types';
import { CreateFacilityPriceHistoryDto } from './create-facility-price-history.dto';

export class UpdateFacilityPriceHistoryDto extends PartialType(CreateFacilityPriceHistoryDto) {}
