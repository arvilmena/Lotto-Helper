import {
  LottoMonitoredVsResultCalculationType,
  LottoResultType,
  UserMonitoredNumberType,
} from '@lottolotto/constants';

export const calculateLottoMonitoredVsResult = (
  result: LottoResultType,
  monitoredNumbers: UserMonitoredNumberType,
): LottoMonitoredVsResultCalculationType => {
  // count how many they successfully guessed
  const matchedNumbers = monitoredNumbers.numbers.filter((n) =>
    result.results.includes(n),
  );

  return {
    matchedCount: matchedNumbers.length,
    monitoredNumbers: monitoredNumbers.numbers,
    matchedNumbers,
  };
};
