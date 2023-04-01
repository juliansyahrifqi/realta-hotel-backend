import { Test, TestingModule } from '@nestjs/testing';
import { FintechService } from './fintech.service';

describe('FintechService', () => {
  let service: FintechService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FintechService],
    }).compile();

    service = module.get<FintechService>(FintechService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
