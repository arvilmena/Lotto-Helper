import { Module } from '@nestjs/common';
import { PcsoWebsiteCrawlsController } from './pcso-website-crawls.controller';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';

@Module({
  controllers: [PcsoWebsiteCrawlsController],
  providers: [PcsoWebsiteCrawlsService],
})
export class PcsoWebsiteCrawlsModule {}
