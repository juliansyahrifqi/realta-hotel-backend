import { Test, TestingModule } from '@nestjs/testing';
import { UserPasswordController } from './user-password.controller';
import { UserPasswordService } from './user-password.service';

describe('UserPasswordController', () => {
  let controller: UserPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPasswordController],
      providers: [UserPasswordService],
    }).compile();

    controller = module.get<UserPasswordController>(UserPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
