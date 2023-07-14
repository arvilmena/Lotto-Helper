import { Controller, Post } from '@nestjs/common';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';

@Controller('pcso-website-crawls')
export class PcsoWebsiteCrawlsController {
  constructor(
    private readonly pcsoWebsiteCrawlsService: PcsoWebsiteCrawlsService,
  ) {}

  @Post()
  crawl() {
    return this.pcsoWebsiteCrawlsService.crawl();
  }

  @Post('/test')
  test() {
    return this.pcsoWebsiteCrawlsService.test();
  }
}
