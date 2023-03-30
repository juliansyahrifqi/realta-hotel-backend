import { Test, TestingModule } from '@nestjs/testing';
import { FacilityPhotoController } from './facility-photo.controller';
import { FacilityPhotoService } from './facility-photo.service';

describe('FacilityPhotoController', () => {
  let controller: FacilityPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityPhotoController],
      providers: [FacilityPhotoService],
    }).compile();

    controller = module.get<FacilityPhotoController>(FacilityPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
