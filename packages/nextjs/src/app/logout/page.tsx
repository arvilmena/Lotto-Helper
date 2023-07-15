'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Index() {
  const { signOut } = useClerk();
  const { isLoaded, userId } = useAuth();

  const router = useRouter();
  const SignOutThenRedirect = async () => {
    signOut().then(() => router.push('/'));
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (isLoaded && userId) SignOutThenRedirect();
    router.push('/');
  }, [signOut, userId, isLoaded, SignOutThenRedirect]);

  return 'Signing you out...';
}
