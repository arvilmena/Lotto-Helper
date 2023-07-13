import { SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './../DropdownMenu/DropdownMenu';

const HeaderNavbar = ({ displayName }: { displayName: string }) => {
  return (
    <nav className="bg-lotto-blue text-white px-4 pb-3 pt-4 uppercase leading-none font-bold tracking-wider flex justify-between w-full">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="">
        <SignedIn>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="pointer-cursor">
              Hello {displayName}!
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/account">Ang aking mga taya</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/account/settings">Ayusin ang aking account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/logout">Mag sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
    </nav>
  );
};

export { HeaderNavbar };
