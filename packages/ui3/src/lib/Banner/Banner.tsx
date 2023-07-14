import Image from 'next/image';
import src from './maynanalona-banner.png';
export const Banner = () => {
  return <Image src={src} alt="May nanalo na!" width={1024} height={858} />;
};
