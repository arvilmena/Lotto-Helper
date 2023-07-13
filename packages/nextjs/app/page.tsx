import { auth } from '@clerk/nextjs';
import { LoginButton, RegisterButton } from '@lottolotto/ui';
export default async function Index() {
  const { userId } = auth();
  return (
    <div className="text-center">
      <h1 className="text-5xl uppercase text-lotto-blue tracking-wide font-bold">
        May nanalo na!
      </h1>
      <p className="text-xl">
        Monitor your bets and get notified when you win!
      </p>

      {!userId && (
        <>
          <div className="mt-7 flex flex-col space-y-3">
            <div>
              <RegisterButton />
            </div>
            <div>
              <LoginButton />
            </div>
          </div>

          <hr className="mt-10" />
        </>
      )}

      <div className="mt-10 flex flex-col items-center">
        <div>
          <h2 className="text-center text-2xl tracking-wide font-bold">
            Paano gumagana
          </h2>
        </div>
        <div className="prose text-left max-w-xs">
          <ol>
            <li>
              Piliin ang sinalihang lotto: <br />
              <em>Halimbawa:</em> 6/49
            </li>
            <li>Ilista ang mga numerong iyong tinaya o laging tinataya</li>
            <li>
              Pagkatapos ng draw, papadalhan namin kayo ng email kung ilan sa
              inyong numero ang tumama
            </li>
          </ol>
          <hr />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div>
          <h2 className="text-center text-2xl tracking-wide font-bold">
            Bakit
          </h2>
        </div>
        <div className="prose text-left max-w-xs">
          <ol>
            <li>Mahirap mag bantay ng taya at ng resulta ng lotto</li>
            <li>
              Baka dinadaya ka na ng kahera, akala mo 4 na numero lang tama mo 5
              na pala
            </li>
            <li>Libre lang naman ito, bakit hindi?</li>
          </ol>
          <hr />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div>
          <h2 className="text-center text-2xl tracking-wide font-bold">
            Iba pang kakayahan ng aming website
          </h2>
        </div>
        <div className="prose text-left max-w-xs">
          <ol>
            <li>History ng mga tumamang numero</li>
            <li>
              Madaling umalis kung ayaw mo nang makatanggap ng notification
            </li>
            <li>
              Hindi namin kinukuha ang iyong personal na impormasyon! Kahit na
              inyong pangalan hindi namin kelangan!
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
