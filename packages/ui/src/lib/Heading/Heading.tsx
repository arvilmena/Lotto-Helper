export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-3xl uppercase tracking-wide font-bold mb-5">
      {children}
    </h1>
  );
};
