import { z } from 'zod';
import {
  USER_MONITORED_NUMBERS_COMMON_PROPS,
  USER_MONITORED_NUMBERS_COMMON_PROPS_SUPER_REFINE_FN,
} from './user-monitored-numbers';

export const AddMonitoredNumbersFormSchema = z
  .object(USER_MONITORED_NUMBERS_COMMON_PROPS)
  .superRefine(USER_MONITORED_NUMBERS_COMMON_PROPS_SUPER_REFINE_FN);
