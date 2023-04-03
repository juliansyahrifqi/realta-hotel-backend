import { Test, TestingModule } from '@nestjs/testing';
import { StockPhotoService } from './stock-photo.service';

describe('StockPhotoService', () => {
  let service: StockPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockPhotoService],
    }).compile();

    service = module.get<StockPhotoService>(StockPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
