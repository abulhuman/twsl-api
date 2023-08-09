import { Prisma } from '@prisma/client';
import * as chance from 'chance';

export const DEFAULT_ORDER: Prisma.OrderUncheckedCreateInput = {
  id: 10000,
  from: chance().company(),
  to: chance().company(),
  price: chance().integer({ min: 1, max: 1000 }),
  pickupAddress: chance().address(),
  quantity: chance().integer({ min: 1, max: 50 }),
  status: 'QUOTED',
  transporterId: 10000,
};
