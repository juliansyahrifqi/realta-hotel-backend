import { Test, TestingModule } from '@nestjs/testing';
import { UserBonusPointsService } from './user-bonus-points.service';

describe('UserBonusPointsService', () => {
  let service: UserBonusPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBonusPointsService],
    }).compile();

    service = module.get<UserBonusPointsService>(UserBonusPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
