import Link from 'next/link';
import './global.css';

import { Overpass } from '@next/font/google';

const OverpassFont = Overpass({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Welcome to Lotto Helper',
  description: 'An easier way to play lotto',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${OverpassFont.className} bg-white px-5`}>
      <body className="lg:max-w-5xl mx-auto min-h-[calc(100vh-80px)] my-10 bg-gray-100 rounded-lg">
        <div className="overflow-hidden rounded-lg">
          <nav className="bg-lotto-blue text-white px-4 pb-3 pt-4 uppercase leading-none font-bold tracking-wider">
            <Link href="/">Home</Link>
          </nav>
          <div className="px-5 pt-7 pb-9">{children}</div>
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
      </body>
    </html>
  );
}
