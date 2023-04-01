import { Test, TestingModule } from '@nestjs/testing';
import { FacilitiesSupportService } from './facilities-support.service';

describe('FacilitiesSupportService', () => {
  let service: FacilitiesSupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilitiesSupportService],
    }).compile();

    service = module.get<FacilitiesSupportService>(FacilitiesSupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
