import { Test, TestingModule } from '@nestjs/testing';
import { LottoResultsController } from './lotto-results.controller';
import { LottoResultsService } from './lotto-results.service';

describe('LottoResultsController', () => {
  let controller: LottoResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LottoResultsController],
      providers: [LottoResultsService],
    }).compile();

    controller = module.get<LottoResultsController>(LottoResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
