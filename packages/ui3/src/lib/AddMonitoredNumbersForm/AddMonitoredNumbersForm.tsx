'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddMonitoredNumbersFormSchema,
  DEFAULT_SYSTEM_PLAY,
  LOTTO_NAME,
  LOTTO_RULES,
  MY_MONITORED_NUMBERS_ENDPOINT,
  generateNumberArray,
  getDateOneMonthFromNow,
} from '@lottolotto/util';
import { LottoGameType, LottoId } from '@prisma/client';
import { PlusCircledIcon, ResetIcon, UploadIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
// type AddMonitoredNumbersFormValue = {
//   lottoId: LottoId;
//   gameType: keyof typeof DEFAULT_SYSTEM_PLAY;
//   numbers: number[];
// };
type AddMonitoredNumbersFormValue = z.infer<
  typeof AddMonitoredNumbersFormSchema
>;

export const AddMonitoredNumbersForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddMonitoredNumbersFormValue & { agree: boolean }>({
    defaultValues: {
      lottoId: undefined,
      gameType: LottoGameType.Standard,
      numbers: [],
      agree: false,
    },
    resolver: zodResolver(AddMonitoredNumbersFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<AddMonitoredNumbersFormValue> = async (
    data: AddMonitoredNumbersFormValue,
  ) => {
    console.log(data);
    setIsSubmitting(true);
    const resp = await fetch(MY_MONITORED_NUMBERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log({ resp });
    setIsSubmitting(false);
  };

  const [addingMonitoredNumber, setAddingMonitoredNumber] = useState(true);

  const { lottoId, gameType, numbers } = watch();

  const numbersToPick = useMemo(() => {
    if (!lottoId) return 0;
    if (!gameType) return LOTTO_RULES[lottoId].numbersToDraw;
    return LOTTO_RULES[lottoId].systemPlay[gameType].numbersToPick;
  }, [lottoId, gameType]);
  const pickableNumbers = useMemo(() => {
    if (!lottoId) return [];
    return generateNumberArray(LOTTO_RULES[lottoId].maxRange);
  }, [lottoId]);

  useEffect(() => {
    if (!setValue) return;
    setValue('numbers', []);
  }, [gameType, setValue, lottoId]);

  // useEffect(() => {
  //   console.log('lottoId', lottoId);
  // }, [lottoId]);
  // useEffect(() => {
  //   console.log('numbersToPick', numbersToPick);
  // }, [numbersToPick]);
  // useEffect(() => {
  //   console.log('numbers', numbers);
  // }, [numbers]);
  // useEffect(() => {
  //   console.log('gameType', gameType);
  // }, [gameType]);

  // const _numbers = generateNumberArray(58);
  return (
    <>
      {!addingMonitoredNumber && (
        <Button size={`lg`} onClick={() => setAddingMonitoredNumber(true)}>
          <PlusCircledIcon className="w-5 h-5 mr-1" />{' '}
          <span className="leading-none inline-block">Magdagdag</span>
        </Button>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: addingMonitoredNumber ? 'block' : 'none' }}
        className="border border-gray-300 p-5"
      >
        <Heading level={3}>Nagdadagdag ng numero</Heading>

        <div className="mb-5">
          <select
            {...register('lottoId', { required: true })}
            className="w-full"
            id="lottoId"
            required={true}
          >
            <option value="">Piliin kung anong lotto</option>
            {Object.keys(LOTTO_RULES).map((lottoId) => (
              <option key={lottoId} value={lottoId}>
                {LOTTO_NAME[lottoId as LottoId]}
              </option>
            ))}
          </select>
          <ErrorMessage errors={errors} name="lottoId" />
        </div>
        {lottoId?.length > 0 && (
          <div
          // style={{ display: lottoId?.length ? 'block' : 'none' }}
          >
            <select
              {...register('gameType', { required: true })}
              id="gameType"
              className="w-full"
              required={true}
            >
              {lottoId &&
                Object.keys(LOTTO_RULES[lottoId].systemPlay).map((gameType) => (
                  <option key={gameType} value={gameType}>
                    {
                      LOTTO_RULES[lottoId].systemPlay[
                        gameType as keyof typeof DEFAULT_SYSTEM_PLAY
                      ].label
                    }
                  </option>
                ))}
            </select>
            <ErrorMessage errors={errors} name="gameType" />
          </div>
        )}

        {lottoId &&
          gameType &&
          numbersToPick > 0 &&
          pickableNumbers.length > 0 && (
            <>
              {numbersToPick > 0 && gameType && (
                <div className="my-5">
                  Pumili ng <strong>{numbersToPick}</strong> na numero
                </div>
              )}
              <div
                className={clsx(
                  `gap-2 grid grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-flow-col`,
                  {
                    'grid-cols-[1fr_1fr_1fr_1fr_1fr]':
                      pickableNumbers.length > 49,
                    'grid-cols-[1fr_1fr_1fr_1fr]': pickableNumbers.length < 50,
                  },
                )}
              >
                {Object.values(pickableNumbers).map((number) => {
                  const isDisabled =
                    !(numbers as unknown as string[]).includes(
                      String(number),
                    ) &&
                    (numbersToPick === numbers.length ||
                      numbersToPick < numbers.length);
                  return (
                    <label
                      key={number}
                      className="relative w-full"
                      onClick={() => {
                        if (isDisabled) {
                          alert(`Naka-${numbersToPick} ka na!`);
                        }
                      }}
                    >
                      <input
                        {...register('numbers')}
                        type="checkbox"
                        value={number}
                        disabled={isDisabled}
                        className=" z-[1] focus:ring-0 focus:outline-none outline-0 absolute top-0 left-0 h-[1px] w-[1px] border-none appearance-none outline-none ring-0 "
                      />
                      <span
                        className={clsx(
                          `w-auto border p-5 relative z-[2] h-6 flex items-center justify-center`,
                          {
                            'bg-green-400 font-bold': (
                              numbers as unknown as string[]
                            ).includes(String(number)),
                            'border-red-300': !(
                              numbers as unknown as string[]
                            ).includes(String(number)),
                          },
                        )}
                      >
                        <span>{number.toString().padStart(2, '0')}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              <div>
                <ErrorMessage errors={errors} name="numbers" />
              </div>
              <div className="my-5 text-center">
                <Button type="button" onClick={() => setValue('numbers', [])}>
                  <ResetIcon className="w-4 h-4 mr-1" />
                  <span className="inline-flex tracking-widest">Ulitin</span>
                </Button>
              </div>

              <div className="my-5">
                Mga napili: {numbers.length === 0 && <em>Wala pang napili</em>}
                {numbers.length > 0 && (
                  <>
                    <br />
                    <strong>
                      {new Float64Array(numbers).sort().join(', ')}
                    </strong>
                  </>
                )}
              </div>
            </>
          )}

        {lottoId?.length > 0 && gameType && (
          <label className="flex space-x-2">
            <input type="checkbox" {...register('agree')} required={true} />
            <p className="text-sm">
              <strong>Ang pagmonitor ay na-e-expire.</strong> Ang pagmonitor ay
              hanggang{' '}
              <strong className="underline">
                {getDateOneMonthFromNow().toLocaleDateString()}
              </strong>{' '}
              lamang <em>(1 buwan mula ngayon)</em>.
              <br />
              Makalipas nito ay hindi na ako makakatanggap ng notipikasyon at
              hindi na lilitaw sa kalkulasyon para sa mga numerong ito.
              <br />
              Kung gusto kong i-monitor ulit, kelangan kong idagdag muli ang mga
              numerong ito matapos ng petsang ito.
            </p>
          </label>
        )}
        <div className="mt-5 flex space-x-3">
          <Button
            type="submit"
            size={`lg`}
            disabled={isSubmitting}
            className={clsx(``, {
              'pointer-events-none': isSubmitting,
            })}
          >
            <UploadIcon className="w-[15px] h-[15px] text-lg mr-1" />{' '}
            <span>Idagdag</span>
          </Button>
          <Button
            type="button"
            variant={`destructive`}
            size={`lg`}
            onClick={() => setAddingMonitoredNumber(false)}
            disabled={isSubmitting}
            className={clsx(``, {
              'pointer-events-none': isSubmitting,
            })}
          >
            Ikansel
          </Button>
        </div>
      </form>
    </>
  );
};
