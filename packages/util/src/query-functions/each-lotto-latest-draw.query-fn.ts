import { LottoResultType } from '@lottolotto/constants';
import { frontendUrlAxiosInstance } from '../constants/urls';

export const getEachLottoLatestDrawQueryFn = async () =>
  frontendUrlAxiosInstance
    .get<LottoResultType[]>(`/api/public/latest-draw`)
    .then((res) => {
      return res?.data;
    });

export const getEachLottoLatestDrawQueryKey = 'getEachLottoLatestDraw';
