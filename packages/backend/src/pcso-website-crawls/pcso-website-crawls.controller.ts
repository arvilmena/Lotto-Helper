import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { CreatePcsoWebsiteCrawlDto } from './dto/create-pcso-website-crawl.dto';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';

@Controller('pcso-website-crawls')
export class PcsoWebsiteCrawlsController {
  constructor(
    private readonly pcsoWebsiteCrawlsService: PcsoWebsiteCrawlsService,
  ) {}

  @Post()
  async crawl(@Body() body: CreatePcsoWebsiteCrawlDto) {
    if (body?.password && body.password === process.env.CRAWL_PASSWORD) {
      return await this.pcsoWebsiteCrawlsService.crawl();
    }
    throw new ForbiddenException();
  }

  @Post('/test')
  test() {
    return this.pcsoWebsiteCrawlsService.test();
  }

  @Post('/test-date')
  testDate() {
    return this.pcsoWebsiteCrawlsService.testDate();
  }
}
