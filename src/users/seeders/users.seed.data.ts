import { Prisma, UserTypeEnum } from '@prisma/client';
import * as chance from 'chance';

const password = null;

export const DEFAULT_MANUFACTURER_USER: Prisma.UserCreateInput = {
  email: 'manufacturer@tw.sl',
  password: password, // super-secret
  type: UserTypeEnum.MANUFACTURER,
  companyName: chance().company(),
  address: chance().address(),
};

export const DEFAULT_TRANSPORTER_USER: Prisma.UserUncheckedCreateWithoutOrdersInput =
  {
    id: 10000,
    email: 'transporter@tw.sl',
    password, // super-secret
    type: UserTypeEnum.TRANSPORTER,
    companyName: chance().company(),
  };
