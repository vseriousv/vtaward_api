import { Test, TestingModule } from '@nestjs/testing';
import { NominationOrderService } from './nomination-order.service';

describe('NominationOrderService', () => {
  let service: NominationOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NominationOrderService],
    }).compile();

    service = module.get<NominationOrderService>(NominationOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
