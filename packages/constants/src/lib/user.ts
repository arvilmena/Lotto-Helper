import { z } from 'zod';

export const UserIdSchema = z.string().nonempty();

export const USER_ID_OBJECT_PROPS = {
  userId: UserIdSchema,
};

export const UserIdObjectSchema = z.object(USER_ID_OBJECT_PROPS);
