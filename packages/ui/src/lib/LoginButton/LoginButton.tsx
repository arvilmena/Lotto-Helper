import Link from 'next/link';
import { buttonVariants } from '../Button/Button';

export const LoginButton = () => {
  return (
    <Link
      href="/login"
      className={`${buttonVariants({ size: 'xl' })} text-xl cursor-pointer`}
    >
      Mag Login
    </Link>
  );
};
