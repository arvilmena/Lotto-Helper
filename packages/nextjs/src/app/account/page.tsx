'use client';

import {
  AddMonitoredNumbersForm,
  Heading,
  LatestLottoDrawWithFilter,
} from '@lottolotto/ui3';
import { useLatestLottoDraw } from '../../lib/use-latest-lotto-draw';

export default function Index() {
  const latestDraw = useLatestLottoDraw();

  return (
    <>
      <div className="flex space-x-8">
        <div className="max-w-full w-1/2">
          <Heading>Mga pinakahuling bola</Heading>

          <LatestLottoDrawWithFilter latestDraw={latestDraw} />
        </div>
        <div className="max-w-full w-1/2 pl-10 border-l border-gray-200">
          <Heading level={2}>Mga binabantayang numero:</Heading>

          <p>Wala pang binabantayang numero...</p>

          <div className="mt-5">
            <AddMonitoredNumbersForm />
          </div>
        </div>
      </div>
    </>
  );
}
