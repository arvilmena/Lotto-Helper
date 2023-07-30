// 'use client';
import { auth } from '@clerk/nextjs';
import { AccountPage } from '@lottolotto/ui3';
import {
  getEachLottoLatestDrawQueryFn,
  getEachLottoLatestDrawQueryKey,
  getUserMonitoredNumbersQueryFn,
  getUserMonitoredNumbersQueryKey,
} from '@lottolotto/util';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '../../components/client/ReactQueryHydrate/ReactQueryHydrate';
import getQueryClient from '../../lib/getQueryClient';

export default async function Index() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [getEachLottoLatestDrawQueryKey],
    getEachLottoLatestDrawQueryFn,
  );

  const { userId } = auth();

  await queryClient.prefetchQuery(
    [getUserMonitoredNumbersQueryKey, userId],
    getUserMonitoredNumbersQueryFn,
  );
  const dehydratedState = dehydrate(queryClient);
  // const userMonitoredNumbers = useSWR(MY_MONITORED_NUMBERS_ENDPOINT);
  // console.log({ userMonitoredNumbers });
  if (!userId) {
    throw new Error('You must be signed in to add an item to your cart');
  }
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <AccountPage />
    </ReactQueryHydrate>
  );
}
