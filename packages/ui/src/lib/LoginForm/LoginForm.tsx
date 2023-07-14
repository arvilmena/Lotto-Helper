import { SignIn } from '@clerk/nextjs';
import { OverpassFont } from '../../fonts/Overpass.font';
import { RegisterButton } from '../RegisterButton/RegisterButton';

export const CLERK_APPEARANCE_SETTINGS = {
  elements: {
    formButtonPrimary: 'bg-primary text-white hover:bg-primary/90',
    colorPrimary: 'text-primary',
    fontFamily: OverpassFont.className,
  },
};

export const LoginForm = () => {
  return (
    <div>
      <div className="flex justify-center space-x-5">
        <div className="text-center">
          <h1 className="text-3xl uppercase tracking-wide font-bold mb-5">
            Mag login
          </h1>
          <SignIn appearance={CLERK_APPEARANCE_SETTINGS} />
        </div>
        <div className="border-l border-gray-300 pl-7">
          <h2 className="text-xl uppercase tracking-wide font-bold mb-5 mt-20">
            Wala pang account?
          </h2>
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};
