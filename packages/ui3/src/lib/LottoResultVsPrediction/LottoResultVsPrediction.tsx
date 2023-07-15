import type { LottoResult as LottoResultType } from '@prisma/client';
import { LottoPredictionResult } from '../LottoPredictionResult/LottoPredictionResult';
import { LottoResult } from '../LottoResult/LottoResult';

export const LottoResultVsPrediction = ({
  result,
}: {
  result: LottoResultType;
}) => {
  return (
    <div>
      <LottoResult result={result} />

      <div className="mt-6">
        <div className="text-xl font-bold mb-3">Kung itinaya mo ang:</div>
        <div className="space-y-3">
          <LottoPredictionResult
            data={[
              { predictions: [13, 26, 3, 32, 26, 42], matchedCount: 0 },
              { predictions: [1, 26, 15, 32, 5, 42], matchedCount: 2 },
              { predictions: [13, 2, 15, 4, 26, 6], matchedCount: 4 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
