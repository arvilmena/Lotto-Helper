import { z } from 'zod';

export const LottoMonitoredVsResultCalculation = z.object({
  matchedCount: z.number(),
  monitoredNumbers: z.array(z.coerce.number()),
  matchedNumbers: z.array(z.coerce.number()),
});

export type LottoMonitoredVsResultCalculationType = z.infer<
  typeof LottoMonitoredVsResultCalculation
>;
