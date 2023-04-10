import { Test, TestingModule } from '@nestjs/testing';
import { UserAccountsController } from './user_accounts.controller';
import { UserAccountsService } from './user_accounts.service';

describe('UserAccountsController', () => {
  let controller: UserAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAccountsController],
      providers: [UserAccountsService],
    }).compile();

    controller = module.get<UserAccountsController>(UserAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
