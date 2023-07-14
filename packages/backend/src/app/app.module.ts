import { Module } from '@nestjs/common';

import { PcsoWebsiteCrawlsModule } from '../pcso-website-crawls/pcso-website-crawls.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PcsoWebsiteCrawlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
