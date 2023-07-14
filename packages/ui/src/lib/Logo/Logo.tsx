import Image from 'next/image';
import src from './maynanalona-logo.png';

export const Logo = () => {
  return <Image src={src} alt={'May Nanalo Na!'} width={973} height={420} />;
};
