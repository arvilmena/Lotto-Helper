import { LATEST_LOTTO_DRAW_ENDPOINT } from '@lottolotto/util';
import { LottoResult } from '@prisma/client';

export const getLatestLottoDraw = async (): Promise<LottoResult[]> => {
  const res = await fetch(LATEST_LOTTO_DRAW_ENDPOINT);
  return (await res.json()) as LottoResult[];
};
