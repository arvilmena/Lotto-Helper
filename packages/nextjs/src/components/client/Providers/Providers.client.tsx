'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { queryClientOptions } from './../../../utils/constants';

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
