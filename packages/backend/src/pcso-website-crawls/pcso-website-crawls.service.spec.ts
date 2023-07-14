import { Test, TestingModule } from '@nestjs/testing';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';

describe('PcsoWebsiteCrawlsService', () => {
  let service: PcsoWebsiteCrawlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcsoWebsiteCrawlsService],
    }).compile();

    service = module.get<PcsoWebsiteCrawlsService>(PcsoWebsiteCrawlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
