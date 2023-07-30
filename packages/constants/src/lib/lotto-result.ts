import { LottoId } from '@prisma/client';
import { z } from 'zod';

export const LOTTO_RESULT_PROPS = {
  id: z.number(),
  drawAtString: z.string(),
  drawAt: z.coerce.date(),
  results: z.array(z.coerce.number()),
  lottoId: z.nativeEnum(LottoId),
  jackpotPrize: z.number().nullable(),
  winners: z.number().nullable(),
};

export const LottoResultSchema = z.object(LOTTO_RESULT_PROPS);

export type LottoResultType = z.infer<typeof LottoResultSchema>;
