import { LottoGameType, LottoId } from '@prisma/client';

export const DEFAULT_SYSTEM_PLAY = {
  [LottoGameType.Standard]: {
    numbersToPick: 6,
    label: 'Standard',
  },
  [LottoGameType.System5R]: {
    numbersToPick: 5,
    label: 'System 5-Roll (5R)',
  },
  [LottoGameType.System7]: {
    numbersToPick: 7,
    label: 'System 7',
  },
  [LottoGameType.System8]: {
    numbersToPick: 8,
    label: 'System 8',
  },
  [LottoGameType.System9]: {
    numbersToPick: 9,
    label: 'System 9',
  },
  [LottoGameType.System10]: {
    numbersToPick: 10,
    label: 'System 10',
  },
  [LottoGameType.System11]: {
    numbersToPick: 11,
    label: 'System 11',
  },
  [LottoGameType.System12]: {
    numbersToPick: 12,
    label: 'System 12',
  },
};

export type LottoRuleType = {
  numbersToDraw: number;
  maxRange: number;
  systemPlay: typeof DEFAULT_SYSTEM_PLAY;
};

export const LOTTO_RULES: { [key in LottoId]: LottoRuleType } = {
  [LottoId.PCSO_6_45]: {
    numbersToDraw: 6,
    maxRange: 45,
    systemPlay: DEFAULT_SYSTEM_PLAY,
  },

  [LottoId.PCSO_6_49]: {
    numbersToDraw: 6,
    maxRange: 49,
    systemPlay: DEFAULT_SYSTEM_PLAY,
  },

  [LottoId.PCSO_6_55]: {
    numbersToDraw: 6,
    maxRange: 55,
    systemPlay: DEFAULT_SYSTEM_PLAY,
  },

  [LottoId.PCSO_6_58]: {
    numbersToDraw: 6,
    maxRange: 58,
    systemPlay: DEFAULT_SYSTEM_PLAY,
  },
};
