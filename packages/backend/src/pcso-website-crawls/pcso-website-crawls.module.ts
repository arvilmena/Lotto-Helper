import { Module } from '@nestjs/common';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';
import { PcsoWebsiteCrawlsController } from './pcso-website-crawls.controller';

@Module({
  controllers: [PcsoWebsiteCrawlsController],
  providers: [PcsoWebsiteCrawlsService],
})
export class PcsoWebsiteCrawlsModule {}
