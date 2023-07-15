import { LottoResult } from '@prisma/client';

export type UseLatestDrawType = {
  data: LottoResult[];
  isLoading: boolean;
  error: any;
};
