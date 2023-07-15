import { Module } from '@nestjs/common';
import { LottoResultsController } from './lotto-results.controller';
import { LottoResultsService } from './lotto-results.service';

@Module({
  controllers: [LottoResultsController],
  providers: [LottoResultsService],
})
export class LottoResultsModule {}
