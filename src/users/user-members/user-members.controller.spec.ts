import { Test, TestingModule } from '@nestjs/testing';
import { UserMembersController } from './user-members.controller';
import { UserMembersService } from './user-members.service';

describe('UserMembersController', () => {
  let controller: UserMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMembersController],
      providers: [UserMembersService],
    }).compile();

    controller = module.get<UserMembersController>(UserMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
