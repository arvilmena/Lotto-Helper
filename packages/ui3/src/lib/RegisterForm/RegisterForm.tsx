import { SignUp } from '@clerk/nextjs';
import { LoginButton } from '../LoginButton/LoginButton';
import { CLERK_APPEARANCE_SETTINGS } from '../LoginForm/LoginForm';

export const RegisterForm = () => {
  return (
    <div>
      <div className="flex justify-center space-x-5">
        <div className="text-center">
          <h1 className="text-3xl uppercase tracking-wide font-bold mb-5">
            Gumawa ng account
          </h1>
          <SignUp appearance={CLERK_APPEARANCE_SETTINGS} />
        </div>
        <div className="border-l border-gray-300 pl-7">
          <h2 className="text-xl uppercase tracking-wide font-bold mb-5 mt-20">
            May account na?
          </h2>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};
