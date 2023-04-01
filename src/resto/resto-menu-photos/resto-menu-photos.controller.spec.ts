import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenuPhotosController } from './resto-menu-photos.controller';

describe('RestoMenuPhotosController', () => {
  let controller: RestoMenuPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoMenuPhotosController],
    }).compile();

    controller = module.get<RestoMenuPhotosController>(RestoMenuPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
