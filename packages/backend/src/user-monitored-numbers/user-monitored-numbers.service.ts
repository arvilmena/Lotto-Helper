import {
  AddMonitoredNumbersWithUserSchema,
  getDateOneMonthFromNow,
} from '@lottolotto/util';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { UserMonitoredNumbersRepository } from './repositories/user-monitored-numbers.repository';

@Injectable()
export class UserMonitoredNumbersService {
  constructor(
    private readonly userMonitoredNumbersRepository: UserMonitoredNumbersRepository,
  ) {}

  async create(payload: z.infer<typeof AddMonitoredNumbersWithUserSchema>) {
    const data = await this.userMonitoredNumbersRepository.create({
      data: {
        userId: payload.userId,
        numbers: payload.numbers.sort((a, b) => a - b),
        lotto: {
          connect: {
            id: payload.lottoId,
          },
        },
        gameType: payload.gameType,
        expiresAt: getDateOneMonthFromNow(),
      },
    });
    return data;
  }

  findAll() {
    return `This action returns all userMonitoredNumbers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMonitoredNumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMonitoredNumber`;
  }
}
