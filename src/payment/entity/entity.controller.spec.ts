import { Test, TestingModule } from '@nestjs/testing';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';

describe('EntityController', () => {
  let controller: EntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityController],
      providers: [EntityService],
    }).compile();

    controller = module.get<EntityController>(EntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
