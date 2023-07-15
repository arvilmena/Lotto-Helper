import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LottoResultsService {
  constructor(private readonly prisma: PrismaService) {}
  async getLatest() {
    return await this.prisma.lottoResult.findMany({
      distinct: ['lottoId'],
      orderBy: {
        drawAt: 'desc',
      },
    });
  }
}
