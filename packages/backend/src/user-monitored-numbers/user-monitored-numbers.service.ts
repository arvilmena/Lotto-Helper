import { UserIdSchema } from '@lottolotto/constants';
import {
  AddMonitoredNumbersWithUserSchema,
  USER_MAXIMUM_MONITORED_NUMBERS_PER_LOTTO,
  getDateOneMonthFromNow,
} from '@lottolotto/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { UserMonitoredNumbersRepository } from './repositories/user-monitored-numbers.repository';

@Injectable()
export class UserMonitoredNumbersService {
  constructor(
    private readonly userMonitoredNumbersRepository: UserMonitoredNumbersRepository,
  ) {}

  async create(payload: z.infer<typeof AddMonitoredNumbersWithUserSchema>) {
    const existingRecordsRaw = await this.findOne(payload.userId);
    if (
      existingRecordsRaw.filter((n) => n.lottoId === payload.lottoId).length >=
      USER_MAXIMUM_MONITORED_NUMBERS_PER_LOTTO
    ) {
      throw new BadRequestException(
        `You can only monitor ${USER_MAXIMUM_MONITORED_NUMBERS_PER_LOTTO} numbers per lotto`,
      );
    }

    // check if the payload numbers already exist in any of the existing records
    const existingRecords = existingRecordsRaw.map((record) => {
      return AddMonitoredNumbersWithUserSchema.parse(record);
    });
    const duplicate = existingRecords?.find((monitoredNumber) => {
      return (
        monitoredNumber.lottoId === payload.lottoId &&
        monitoredNumber.gameType === payload.gameType &&
        monitoredNumber.numbers.sort().join(',') ===
          payload.numbers.sort().join(',')
      );
    });
    if (duplicate) {
      throw new BadRequestException(
        `Mayroon ka nang minomonitor na ganitong mga numero.`,
      );
    }

    const data = await this.userMonitoredNumbersRepository.create({
      data: {
        userId: payload.userId,
        numbers: (payload.numbers ?? []).sort((a, b) => a - b),
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

  async findOne(userId: z.infer<typeof UserIdSchema>) {
    const data = await this.userMonitoredNumbersRepository.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    });
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} userMonitoredNumber`;
  }
}
