import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PcsoWebsiteCrawlsController } from './pcso-website-crawls.controller';
import { PcsoWebsiteCrawlsService } from './pcso-website-crawls.service';

@Module({
  controllers: [PcsoWebsiteCrawlsController],
  providers: [PcsoWebsiteCrawlsService],
  imports: [PrismaModule],
})
export class PcsoWebsiteCrawlsModule {}
