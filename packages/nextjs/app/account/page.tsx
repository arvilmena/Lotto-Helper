import { Heading, LottoResultVsPrediction } from '@lottolotto/ui3';

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
