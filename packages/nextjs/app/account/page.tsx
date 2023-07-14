import { Heading, LottoResultVsPrediction } from '@lottolotto/ui';

export default async function Index() {
  return (
    <>
      <Heading>Mga pinakahuling bola</Heading>

      <div className="max-w-md space-y-10">
        <LottoResultVsPrediction />
        <LottoResultVsPrediction />
        <LottoResultVsPrediction />
      </div>
    </>
  );
}
