import { Test, TestingModule } from '@nestjs/testing';
import { HotelReviewsController } from './hotel-reviews.controller';
import { HotelReviewsService } from './hotel-reviews.service';

describe('HotelReviewsController', () => {
  let controller: HotelReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelReviewsController],
      providers: [HotelReviewsService],
    }).compile();

    controller = module.get<HotelReviewsController>(HotelReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
