export const LottoPredictionResult = ({
  predictions,
  matchedCount,
}: {
  predictions: number[];
  matchedCount: number;
}) => {
  return (
    <div className="flex justify-between items-center border border-gray-300 p-3 space-x-3">
      <div className="flex items-center space-x-2">
        {predictions.map((n, index) => {
          return (
            <span
              key={index}
              className="border border-gray-300 bg-white text-black text-lg font-bold w-10 h-10 flex items-center justify-center leading-none"
            >
              <span className="leading-none">
                {n.toString().padStart(2, '0')}
              </span>
            </span>
          );
        })}
      </div>
      <div>
        <div className="flex space-x-3 items-center">
          <span>dami ng tama:</span>
          <span className="font-bold text-xl">{matchedCount}</span>
        </div>
        <hr className="my-2" />
        <ul>
          <li>Php 100.00</li>
        </ul>
      </div>
    </div>
  );
};
