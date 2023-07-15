import clsx from 'clsx';

export const Heading = ({
  children,
  level = 1,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
}) => {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <CustomTag
      className={clsx(`mt-0 tracking-wide font-bold`, {
        'text-3xl mb-5 uppercase': level === 1,
        'text-2xl mb-3': level === 2,
        'text-lg mb-3': level === 3,
      })}
    >
      {children}
    </CustomTag>
  );
};
