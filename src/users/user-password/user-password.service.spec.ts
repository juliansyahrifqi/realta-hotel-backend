import { Test, TestingModule } from '@nestjs/testing';
import { UserPasswordService } from './user-password.service';

describe('UserPasswordService', () => {
  let service: UserPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPasswordService],
    }).compile();

    service = module.get<UserPasswordService>(UserPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
