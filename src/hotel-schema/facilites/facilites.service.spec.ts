import { Test, TestingModule } from '@nestjs/testing';
import { FacilitesService } from './facilites.service';

describe('FacilitesService', () => {
  let service: FacilitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitesService],
    }).compile();

    service = module.get<FacilitesService>(FacilitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
