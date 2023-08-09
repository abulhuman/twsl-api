import { PrismaClient, UserTypeEnum } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const manufacturer = await prisma.user.create({
    data: {
      email: 'manufacturer@tw.sl',
      password: '$2b$10$IGl3JEiRBF0y.5BJAWOd.O5FAaGjM3kQqRxcNwD2rf8pmDluZ/AZ.', // password = 12345678
      type: UserTypeEnum.MANUFACTURER,
      companyName: 'UNIVERSAL STUDIOS',
      address: 'Universal City, CA 91608, United States',
    },
  });

  console.log(
    `Created manufacturer "${manufacturer.companyName}" with id: ${manufacturer.id}`,
  );

  const transporter = await prisma.user.create({
    data: {
      email: 'transporter@tw.sl',
      password: '$2b$10$IGl3JEiRBF0y.5BJAWOd.O5FAaGjM3kQqRxcNwD2rf8pmDluZ/AZ.', // password = 12345678
      type: UserTypeEnum.TRANSPORTER,
      companyName: 'DHL (Deutsche Post AG)',
    },
  });

  console.log(
    `Created transporter "${transporter.companyName}" with id: ${transporter.id}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
