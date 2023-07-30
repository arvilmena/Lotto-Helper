import { LottoMonitoredVsResultCalculationType } from '@lottolotto/constants';
import clsx from 'clsx';
import { Table, Td, Th } from '../Table/Table';

export const LottoPredictionResult = ({
  calculations,
}: {
  calculations: LottoMonitoredVsResultCalculationType[];
}) => {
  return (
    <>
      <Table>
        <tr>
          <Th textAlign="text-center" colSpan={3}>
            Binabantayang numero
          </Th>
          <Th textAlign="text-center" colSpan={1}>
            Tumama
          </Th>
          {/* <Th textAlign="text-center" colSpan={1}>
            Premyo
          </Th> */}
        </tr>
        {calculations.map((calculation, index) => {
          return (
            <tr key={index}>
              <Td colSpan={3}>
                <div className="group cursor-pointer flex items-center justify-center space-x-3 px-3">
                  {[...calculation.monitoredNumbers]
                    .sort(function (a, b) {
                      return a - b;
                    })
                    .map((monitoredNumber, index) => {
                      return (
                        <span
                          className={clsx(`transition-all`, {
                            'group-hover:text-xl text-green-500':
                              calculation.matchedNumbers.includes(
                                monitoredNumber,
                              ),
                            'group-hover:text-sm group-hover:opacity-20 text-red-500':
                              !calculation.matchedNumbers.includes(
                                monitoredNumber,
                              ),
                          })}
                          key={index}
                        >
                          {monitoredNumber}
                          {/* {`${
                            index < calculation.monitoredNumbers.length - 1
                              ? ','
                              : ''
                          }`} */}
                        </span>
                      );
                    })}
                </div>
              </Td>
              <Td colSpan={1}>{`${
                calculation.matchedCount === 0
                  ? 'wala'
                  : calculation.matchedCount
              }`}</Td>
              {/* <Td colSpan={1}>
                <span className="text-green-600">Php 100.00</span>
              </Td> */}
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
