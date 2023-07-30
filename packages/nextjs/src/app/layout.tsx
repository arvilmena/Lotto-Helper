import { ClerkProvider, currentUser } from '@clerk/nextjs';
import { HeaderNavbar, OverpassFont } from '@lottolotto/ui3';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { Providers } from '../components/client/Providers/Providers.client';
import './global.css';

export const metadata = {
  title: 'Welcome to Lotto Helper',
  description: 'An easier way to play lotto',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const displayName =
    user?.username ?? user?.emailAddresses[0]?.emailAddress ?? 'Ka-LOTTO';
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${OverpassFont.className} bg-white px-5`}>
          <div className="lg:max-w-5xl w-full mx-auto min-h-[calc(100vh-80px)] my-10 bg-gray-100 rounded-lg">
            <div className="overflow-hidden rounded-lg">
              <HeaderNavbar displayName={displayName} />
              <div className="px-5 pt-7 pb-9">
                <Providers>{children}</Providers>
              </div>
              <footer className="text-center bg-lotto-blue text-white px-4 pb-3 pt-4 uppercase leading-none font-bold tracking-wider">
                <Link
                  className="normal-case tracking-normal leading-none px-[1px] pb-[1px] border-b border-white"
                  href="https://www.linkedin.com/in/arvilmena/"
                  target="_blank"
                >
                  Arvil Meña
                </Link>{' '}
                &copy; {new Date().getFullYear()}
              </footer>
            </div>
          </div>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
