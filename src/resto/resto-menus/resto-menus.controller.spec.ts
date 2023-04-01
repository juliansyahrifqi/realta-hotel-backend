import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenusController } from './resto-menus.controller';

describe('RestoMenusController', () => {
  let controller: RestoMenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoMenusController],
    }).compile();

    controller = module.get<RestoMenusController>(RestoMenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
