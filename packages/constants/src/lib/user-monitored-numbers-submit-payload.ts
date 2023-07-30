import { z } from 'zod';
import { UserIdSchema } from './user';
import {
  USER_MONITORED_NUMBERS_COMMON_PROPS,
  USER_MONITORED_NUMBERS_COMMON_PROPS_SUPER_REFINE_FN,
} from './user-monitored-numbers';

export const UserMonitoredNumbersSubmitPayloadSchema = z
  .object({
    ...USER_MONITORED_NUMBERS_COMMON_PROPS,
    userId: UserIdSchema,
  })
  .superRefine(USER_MONITORED_NUMBERS_COMMON_PROPS_SUPER_REFINE_FN);

export type UserMonitoredNumbersSubmitPayloadType = z.infer<
  typeof UserMonitoredNumbersSubmitPayloadSchema
>;
