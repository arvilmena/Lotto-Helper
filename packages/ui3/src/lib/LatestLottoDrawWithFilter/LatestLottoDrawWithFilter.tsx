'use client';

import {
  LottoResultType,
  UserMonitoredNumberType,
} from '@lottolotto/constants';
import { LOTTO_NAME } from '@lottolotto/util';
import { LottoId } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Heading } from '../Heading/Heading';
import { LottoResultVsPrediction } from '../LottoResultVsPrediction/LottoResultVsPrediction';

type LottoFilterType = {
  filter: string[];
};

export const LatestLottoDrawWithFilter = ({
  latestDraw,
  userMonitoredNumbers,
}: {
  latestDraw: LottoResultType[];
  userMonitoredNumbers: UserMonitoredNumberType[];
}) => {
  const { register, watch } = useForm<LottoFilterType>({
    defaultValues: {
      filter: Object.keys(LottoId),
    },
  });
  const filter = watch('filter');
  return (
    <>
      <div className="border border-gray-400 p-5">
        <Heading level={3}>Ipakita ang resulta ng bola:</Heading>
        <form>
          <div className="space-y-3 grid grid-cols-2">
            {latestDraw &&
              latestDraw.map((n) => {
                return (
                  <div key={n.lottoId} className="flex items-center space-x-2">
                    <input
                      id={`filter-${n.lottoId}`}
                      type="checkbox"
                      {...register('filter')}
                      value={n.lottoId}
                    />
                    <label
                      htmlFor={`filter-${n.lottoId}`}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {LOTTO_NAME[n.lottoId as LottoId]}
                    </label>
                  </div>
                );
              })}
          </div>
        </form>
      </div>

      <div className="mt-7 space-y-10">
        {latestDraw &&
          latestDraw
            .filter((draw) => filter.includes(draw.lottoId))
            .map((draw) => {
              return (
                <LottoResultVsPrediction
                  key={draw.id}
                  result={draw}
                  userMonitoredNumbers={userMonitoredNumbers.filter(
                    (n) => n.lottoId === draw.lottoId,
                  )}
                />
              );
            })}
      </div>
    </>
  );
};

export default LottoFilterType;
