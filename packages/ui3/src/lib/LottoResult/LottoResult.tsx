import { LOTTO_NAME } from '@lottolotto/util';
import type { LottoResult as LottoResultType } from '@prisma/client';
import { Table, Td, Th } from '../Table/Table';

export const LottoResult = ({ result }: { result: LottoResultType }) => {
  return (
    <div>
      <div className="text-3xl text-lotto-red font-bold">
        {LOTTO_NAME[result.lottoId]}
      </div>
      <div className="mt-2 flex justify-between items-center prose">
        <Table>
          {/* Lotto */}
          <tr>
            <Th>Lotto</Th>
            <Td textSize="text-xl">{LOTTO_NAME[result.lottoId]}</Td>
          </tr>
          {/* Lotto ends */}
          {/* Date */}
          <tr>
            <Th>Petsa</Th>
            <Td>{new Date(result.drawAt).toLocaleDateString()}</Td>
          </tr>
          {/* Date ends */}
          {/* Result */}
          <tr>
            <Th>Resulta ng bola</Th>
            <Td>
              <div className="flex items-center justify-center space-x-2 py-3">
                {result.results &&
                  (result.results as number[]).map((n, index) => {
                    return (
                      <span
                        key={index}
                        className="rounded-full bg-orange-400/80 text-black text-lg font-bold w-10 h-10 flex items-center justify-center leading-none"
                      >
                        <span className="leading-none">{n}</span>
                      </span>
                    );
                  })}
              </div>
            </Td>
          </tr>
          {/* Result ends */}
          {/* Jackpot Prize */}
          <tr>
            <Th>Jackpot</Th>
            <Td>
              {result.jackpotPrize && (
                <span className="text-green-600 font-extrabold">
                  {' '}
                  Php{' '}
                  {result.jackpotPrize
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </span>
              )}
            </Td>
          </tr>
          {/* Jackpot Prize ends */}
          {/* Winners */}
          <tr>
            <Th>Nanalo</Th>
            <Td>{result.winners ?? 'Di alam'}</Td>
          </tr>
          {/* Winners ends */}
        </Table>
      </div>
    </div>
  );
};
