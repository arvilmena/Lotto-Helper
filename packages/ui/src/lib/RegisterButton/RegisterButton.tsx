import Link from 'next/link';
import { buttonVariants } from '../Button/Button';

export const RegisterButton = () => {
  return (
    <Link
      href="/register"
      className={`${buttonVariants({ size: 'xl' })} text-xl`}
    >
      Gumawa ng account
    </Link>
  );
};
