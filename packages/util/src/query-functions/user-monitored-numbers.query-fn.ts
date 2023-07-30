import {
  AddMonitoredNumbersFormSchema,
  UserMonitoredNumberType,
} from '@lottolotto/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { frontendUrlAxiosInstance } from '../constants/urls';

export const getUserMonitoredNumbersQueryFn = async () => {
  return frontendUrlAxiosInstance
    .get<UserMonitoredNumberType[]>(`/api/my-monitored-numbers/`)
    .then((res) => {
      console.log(`user monitored:`, res?.data);
      return res?.data ?? [];
    });
};

export const getUserMonitoredNumbersQueryKey = 'getUserMonitoredNumbers';

export const addMonitoredNumbersMutationFn = async (
  data: z.infer<typeof AddMonitoredNumbersFormSchema>,
) => {
  return frontendUrlAxiosInstance
    .post<UserMonitoredNumberType>(`/api/my-monitored-numbers/`, data)
    .then((res) => {
      console.log(`add monitored:`, res?.data);
      return res?.data ?? [];
    });
};

export const useAddMonitoredNumbersMutation = ({
  userId,
  existingUserMonitoredNumbers,
}: {
  userId: string | null;
  existingUserMonitoredNumbers: UserMonitoredNumberType[];
}) => {
  const queryClient = useQueryClient();

  return useMutation(addMonitoredNumbersMutationFn, {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        [getUserMonitoredNumbersQueryKey, userId],
        [variables, ...(existingUserMonitoredNumbers ?? [])],
      );
    },
  });
};
