import { Test, TestingModule } from '@nestjs/testing';
import { UserMembersService } from './user-members.service';

describe('UserMembersService', () => {
  let service: UserMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMembersService],
    }).compile();

    service = module.get<UserMembersService>(UserMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
