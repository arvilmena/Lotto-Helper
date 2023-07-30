import { LottoGameType, LottoId } from '@prisma/client';
import { z } from 'zod';
import { DEFAULT_SYSTEM_PLAY, LOTTO_RULES } from './lotto-rules';
import { USER_ID_OBJECT_PROPS } from './user';

const LottoIdSchema = z.nativeEnum(LottoId);
const gameTypeSchema = z.nativeEnum(LottoGameType);
const numbersSchema = z
  .array(
    z.coerce
      .number()
      // .transform((val, ctx) => {
      //   const parsed = parseInt(val);
      //   if (isNaN(parsed)) {
      //     ctx.addIssue({
      //       code: z.ZodIssueCode.custom,
      //       message: 'Not a number',
      //     });

      //     // This is a special symbol you can use to
      //     // return early from the transform function.
      //     // It has type `never` so it does not affect the
      //     // inferred return type.
      //     return z.NEVER;
      //   }
      //   return parsed;
      // })
      .pipe(
        z
          .number()
          .min(1)
          .max(Math.max(...Object.values(LOTTO_RULES).map((n) => n.maxRange))),
      ),
  )
  .min(
    Math.min(...Object.values(DEFAULT_SYSTEM_PLAY).map((n) => n.numbersToPick)),
    'Kulang',
  )
  .max(
    Math.max(...Object.values(DEFAULT_SYSTEM_PLAY).map((n) => n.numbersToPick)),
  );

export const USER_MONITORED_NUMBERS_COMMON_PROPS = {
  lottoId: LottoIdSchema,
  gameType: gameTypeSchema,
  numbers: numbersSchema,
};

export const USER_MONITORED_NUMBERS_COMMON_PROPS_SUPER_REFINE_FN = (
  {
    lottoId,
    gameType,
    numbers,
  }: {
    lottoId: z.infer<typeof LottoIdSchema>;
    gameType: z.infer<typeof gameTypeSchema>;
    numbers: z.infer<typeof numbersSchema>;
  },
  ctx: z.RefinementCtx,
) => {
  // number of elements in numbers matches the settings for this gameType
  if (
    numbers.length !== LOTTO_RULES[lottoId].systemPlay[gameType].numbersToPick
  ) {
    ctx.addIssue({
      path: ['numbers'],
      code: z.ZodIssueCode.custom,
      message: `Kelangan ${LOTTO_RULES[lottoId].systemPlay[gameType].numbersToPick} numero.`,
    });
  }

  // no number in the numbers is greated that the maxRange
  if (numbers.some((n) => n > LOTTO_RULES[lottoId].maxRange)) {
    ctx.addIssue({
      path: ['numbers'],
      code: z.ZodIssueCode.custom,
      message: `Kelangan mula 1 hanggang ${LOTTO_RULES[lottoId].maxRange} lang.`,
    });
  }
};

export const UserMonitoredNumberSchema = z
  .object({
    ...USER_MONITORED_NUMBERS_COMMON_PROPS,
    ...USER_ID_OBJECT_PROPS,
    id: z.number(),
    startedAt: z.coerce.date(),
    expiresAt: z.coerce.date().nullable(),
  })
  .superRefine(USER_MONITORED_NUMBERS_COMMON_PROPS_SUPER_REFINE_FN);

export type UserMonitoredNumberType = z.infer<typeof UserMonitoredNumberSchema>;
