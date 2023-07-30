import { LottoGameType, LottoId } from '@prisma/client';
import { z } from 'zod';
import { DEFAULT_SYSTEM_PLAY, LOTTO_RULES } from '../constants/lotto-rules';

const COMMON_PROPS = {
  lottoId: z.nativeEnum(LottoId),
  gameType: z.nativeEnum(LottoGameType),
  numbers: z
    .array(
      z
        .string()
        .transform((val, ctx) => {
          const parsed = parseInt(val);
          if (isNaN(parsed)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Not a number',
            });

            // This is a special symbol you can use to
            // return early from the transform function.
            // It has type `never` so it does not affect the
            // inferred return type.
            return z.NEVER;
          }
          return parsed;
        })
        .pipe(
          z
            .number()
            .min(1)
            .max(
              Math.max(...Object.values(LOTTO_RULES).map((n) => n.maxRange)),
            ),
        ),
    )
    .min(
      Math.min(
        ...Object.values(DEFAULT_SYSTEM_PLAY).map((n) => n.numbersToPick),
      ),
      'Kulang',
    )
    .max(
      Math.max(
        ...Object.values(DEFAULT_SYSTEM_PLAY).map((n) => n.numbersToPick),
      ),
    ),
};

export const AddMonitoredNumbersFormSchema = z
  .object(COMMON_PROPS)
  .superRefine(({ lottoId, gameType, numbers }, ctx) => {
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

    // no number in the numbers is greater than the maxRange
    if (numbers.some((n) => n > LOTTO_RULES[lottoId].maxRange)) {
      ctx.addIssue({
        path: ['numbers'],
        code: z.ZodIssueCode.custom,
        message: `Kelangan mula 1 hanggang ${LOTTO_RULES[lottoId].maxRange} lang.`,
      });
    }
  });

export const AddMonitoredNumbersWithUserSchema = z
  .object({
    ...COMMON_PROPS,
    numbers: z.array(
      z
        .number()
        .min(1)
        .max(Math.max(...Object.values(LOTTO_RULES).map((n) => n.maxRange))),
    ),
    userId: z.string().nonempty(),
  })
  .superRefine(({ lottoId, gameType, numbers }, ctx) => {
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
  });
