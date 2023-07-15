import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { LottoResultsModule } from '../lotto-results/lotto-results.module';
import { PcsoWebsiteCrawlsModule } from '../pcso-website-crawls/pcso-website-crawls.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserMonitoredNumbersModule } from '../user-monitored-numbers/user-monitored-numbers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    PcsoWebsiteCrawlsModule,
    LottoResultsModule,
    UserMonitoredNumbersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
