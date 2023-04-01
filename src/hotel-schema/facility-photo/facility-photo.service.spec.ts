import { Test, TestingModule } from '@nestjs/testing';
import { FacilityPhotoService } from './facility-photo.service';

describe('FacilityPhotoService', () => {
  let service: FacilityPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityPhotoService],
    }).compile();

    service = module.get<FacilityPhotoService>(FacilityPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
