import { UserTypeEnum } from '@prisma/client';

export type JwtPayload = {
  sub: number;
  email: string;
  type: UserTypeEnum;
  address?: string;
};
