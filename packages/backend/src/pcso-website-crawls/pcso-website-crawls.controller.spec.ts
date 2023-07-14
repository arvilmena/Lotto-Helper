import { Test, TestingModule } from '@nestjs/testing';
import { PcsoWebsiteCrawlsController } from './pcso-website-crawls.controller';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';

describe('PcsoWebsiteCrawlsController', () => {
  let controller: PcsoWebsiteCrawlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PcsoWebsiteCrawlsController],
      providers: [PcsoWebsiteCrawlsService],
    }).compile();

    controller = module.get<PcsoWebsiteCrawlsController>(
      PcsoWebsiteCrawlsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
