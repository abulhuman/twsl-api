import { Prisma, PrismaClient } from '@prisma/client';
import { AbstractSeeder } from 'src/prisma/abstract.seeder';
import { DEFAULT_ORDER } from './orders.seed.data';

export class OrdersSeeder extends AbstractSeeder {
  constructor(db: PrismaClient) {
    super(db);
  }

  async seed() {
    await this.seedOrder(DEFAULT_ORDER);
  }

  private async seedOrder(
    defaultOrderCreateData: Prisma.OrderUncheckedCreateInput,
  ) {
    await this.db.order.upsert({
      where: {
        id: defaultOrderCreateData.id,
      },
      update: {
        ...defaultOrderCreateData,
      },
      create: {
        ...defaultOrderCreateData,
      },
    });
  }
}
