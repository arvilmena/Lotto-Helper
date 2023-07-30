'use client';
import { useAuth } from '@clerk/nextjs';
import {
  getEachLottoLatestDrawQueryFn,
  getEachLottoLatestDrawQueryKey,
  getUserMonitoredNumbersQueryFn,
  getUserMonitoredNumbersQueryKey,
  useAddMonitoredNumbersMutation,
} from '@lottolotto/util';
import { useQuery } from '@tanstack/react-query';
import { AddMonitoredNumbersForm } from '../AddMonitoredNumbersForm/AddMonitoredNumbersForm';
import { Heading } from '../Heading/Heading';
import { LatestLottoDrawWithFilter } from '../LatestLottoDrawWithFilter/LatestLottoDrawWithFilter';
import { LoaderWithAbsolutePosition } from '../Loader/Loader';

export const AccountPage = () => {
  const { data: latestDraw } = useQuery({
    queryKey: [getEachLottoLatestDrawQueryKey],
    queryFn: getEachLottoLatestDrawQueryFn,
  });

  const { userId } = useAuth();

  const { data: userMonitoredNumbers } = useQuery({
    queryFn: getUserMonitoredNumbersQueryFn,
    queryKey: [getUserMonitoredNumbersQueryKey, userId],
  });

  const addMonitoredNumbersMutation = useAddMonitoredNumbersMutation({
    userId: userId ?? null,
    existingUserMonitoredNumbers: userMonitoredNumbers ?? [],
  });

  return (
    <div className="flex space-x-8">
      <div className="max-w-full w-1/2">
        <Heading>Mga pinakahuling bola</Heading>

        {!latestDraw && (
          <div className="relative h-[300px]">
            <LoaderWithAbsolutePosition />
          </div>
        )}
        {latestDraw && (
          <LatestLottoDrawWithFilter
            latestDraw={latestDraw}
            userMonitoredNumbers={userMonitoredNumbers ?? []}
          />
        )}
      </div>
      <div className="max-w-full w-1/2 pl-10 border-l border-gray-200">
        <Heading level={2}>Mga binabantayang numero:</Heading>

        <p>Wala pang binabantayang numero...</p>

        <div className="mt-5">
          <AddMonitoredNumbersForm
            addMonitoredNumbersMutation={addMonitoredNumbersMutation}
            existingUserMonitoredNumbers={userMonitoredNumbers ?? []}
          />
        </div>
      </div>
    </div>
  );
};
