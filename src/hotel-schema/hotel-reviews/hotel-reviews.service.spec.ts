import { Test, TestingModule } from '@nestjs/testing';
import { HotelReviewsService } from './hotel-reviews.service';

describe('HotelReviewsService', () => {
  let service: HotelReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelReviewsService],
    }).compile();

    service = module.get<HotelReviewsService>(HotelReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
