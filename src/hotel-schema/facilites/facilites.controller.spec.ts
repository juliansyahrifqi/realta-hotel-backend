import { Test, TestingModule } from '@nestjs/testing';
import { FacilitesController } from './facilites.controller';
import { FacilitesService } from './facilites.service';

describe('FacilitesController', () => {
  let controller: FacilitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilitesController],
      providers: [FacilitesService],
    }).compile();

    controller = module.get<FacilitesController>(FacilitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
