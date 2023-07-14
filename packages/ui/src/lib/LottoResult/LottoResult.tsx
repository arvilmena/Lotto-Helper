export const LottoResult = () => {
  return (
    <div>
      <div className="text-3xl text-lotto-red font-bold">6/42</div>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {[...Array(6).keys()].map((n, index) => {
            return (
              <span
                key={index}
                className="rounded-full bg-orange-400 text-black text-lg font-bold w-10 h-10 flex items-center justify-center leading-none"
              >
                <span className="leading-none">{n}</span>
              </span>
            );
          })}
        </div>
        <div>July 22, 2023</div>
      </div>
    </div>
  );
};
