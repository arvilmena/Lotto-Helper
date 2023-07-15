'use client';

import {
  LATEST_LOTTO_DRAW_ENDPOINT,
  UseLatestDrawType,
} from '@lottolotto/util';
import { LottoResult } from '@prisma/client';
import useSWR from 'swr';
import { myFetcher } from './my-fetcher';

export function useLatestLottoDraw(): UseLatestDrawType {
  const { data, error, isLoading } = useSWR(
    LATEST_LOTTO_DRAW_ENDPOINT,
    myFetcher,
  );

  return {
    data: data as LottoResult[],
    isLoading,
    error,
  };
}
