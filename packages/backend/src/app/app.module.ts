import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { PcsoWebsiteCrawlsModule } from '../pcso-website-crawls/pcso-website-crawls.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    PcsoWebsiteCrawlsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
