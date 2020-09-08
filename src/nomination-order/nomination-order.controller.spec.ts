import { Test, TestingModule } from '@nestjs/testing';
import { NominationOrderController } from './nomination-order.controller';

describe('NominationOrderController', () => {
  let controller: NominationOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NominationOrderController],
    }).compile();

    controller = module.get<NominationOrderController>(NominationOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
