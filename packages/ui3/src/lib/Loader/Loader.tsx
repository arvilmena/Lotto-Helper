export const Loader = () => {
  return (
    <div className="mx-auto h-[60px] w-[60px] animate-spin rounded-full border-[10px] border-[#f3f3f3] border-t-green-600"></div>
  );
};

export const LoaderWithAbsolutePosition = () => {
  return (
    <div className="absolute z-10 flex justify-center items-center inset-0 before:content-[''] before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.2)]">
      <div className="relative z-20">
        <Loader />
      </div>
    </div>
  );
};
