import { Controller, Get } from '@nestjs/common';
import { LottoResultsService } from './lotto-results.service';

@Controller('lotto-results')
export class LottoResultsController {
  constructor(private readonly lottoResultsService: LottoResultsService) {}

  @Get()
  async getLatest() {
    try {
      const data = await this.lottoResultsService.getLatest();
      return {
        success: data,
        error: null,
      };
    } catch (error) {
      return {
        success: null,
        error: true,
      };
    }
  }
}
