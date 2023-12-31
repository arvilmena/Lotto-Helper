import { Lotto, LottoId, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const lottos: Lotto[] = [
    {
      id: LottoId.PCSO_6_49,
      name: 'Super Lotto 6/49',
      pcsoId: 1,
    },
    {
      id: LottoId.PCSO_6_45,
      name: 'Mega Lotto 6/45',
      pcsoId: 2,
    },
    {
      id: LottoId.PCSO_6_55,
      name: 'Grand Lotto 6/55',
      pcsoId: 17,
    },
    {
      id: LottoId.PCSO_6_58,
      name: 'Ultra Lotto 6/58',
      pcsoId: 18,
    },
  ];

  await Promise.all(
    lottos.map(async (lotto) => {
      return await prisma.lotto.upsert({
        where: {
          id: lotto.id,
        },
        create: lotto,
        update: {},
      });
    }),
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
