import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenuPhotosService } from './resto-menu-photos.service';

describe('RestoMenuPhotosService', () => {
  let service: RestoMenuPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestoMenuPhotosService],
    }).compile();

    service = module.get<RestoMenuPhotosService>(RestoMenuPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
