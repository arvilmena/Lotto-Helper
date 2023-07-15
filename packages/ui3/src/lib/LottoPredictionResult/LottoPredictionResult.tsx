import { Table, Td, Th } from '../Table/Table';

export const LottoPredictionResult = ({
  data,
}: {
  data: {
    predictions: number[];
    matchedCount: number;
  }[];
}) => {
  return (
    <>
      <Table>
        <tr>
          <Th textAlign="text-center" colSpan={2}>
            Binabantayang numero
          </Th>
          <Th textAlign="text-center" colSpan={1}>
            Tumama
          </Th>
          <Th textAlign="text-center" colSpan={1}>
            Premyo
          </Th>
        </tr>
        {data.map((n, index) => {
          return (
            <tr key={index}>
              <Td colSpan={2}>
                <div className="flex items-center justify-center space-x-2 px-3">
                  {[...n.predictions]
                    .sort(function (a, b) {
                      return a - b;
                    })
                    .join(', ')
                    .trim()}
                </div>
              </Td>
              <Td colSpan={1}>{n.matchedCount}</Td>
              <Td colSpan={1}>
                <span className="text-green-600">Php 100.00</span>
              </Td>
            </tr>
          );
        })}
      </Table>
      {/* <div className="flex justify-between items-center border border-gray-300 p-3 space-x-3">
        <div className="flex items-center space-x-2">
          {predictions.map((n, index) => {
            return (
              <span
                key={index}
                className="border border-gray-300 bg-white text-black text font-bold w-9 h-9 flex items-center justify-center leading-none"
              >
                <span className="leading-none">{n}</span>
              </span>
            );
          })}
        </div>
        <div>
          <div className="flex space-x-3 items-center">
            <span>dami ng tama:</span>
            <span className="font-bold text-lg">{matchedCount}</span>
          </div>
          <hr className="my-2" />
          <ul>
            <li>Php 100.00</li>
          </ul>
        </div>
      </div> */}
    </>
  );
};
