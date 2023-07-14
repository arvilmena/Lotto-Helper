import { LottoPredictionResult } from '../LottoPredictionResult/LottoPredictionResult';
import { LottoResult } from '../LottoResult/LottoResult';

export const LottoResultVsPrediction = () => {
  return (
    <div>
      <LottoResult />

      <div className="mt-6">
        <div className="text-xl font-bold mb-3">Kung itinaya mo ang:</div>

        <div className="space-y-3">
          <LottoPredictionResult
            predictions={[3, 6, 5, 2, 26, 42]}
            matchedCount={2}
          />
          <LottoPredictionResult
            predictions={[13, 26, 15, 32, 26, 42]}
            matchedCount={4}
          />
          <LottoPredictionResult
            predictions={[13, 26, 15, 32, 26, 42]}
            matchedCount={5}
          />
          <LottoPredictionResult
            predictions={[13, 26, 15, 32, 26, 42]}
            matchedCount={6}
          />
        </div>
      </div>
    </div>
  );
};
