import { Injectable } from '@nestjs/common';
import { User, UserTypeEnum } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { RegistrationDto } from 'src/auth/dto/Registration.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(input: RegistrationDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: input.email,
        password: input.password,
        type: input.type,
        address: input.address,
        companyName: input.companyName,
      },
    });
  }

  async findAll({
    type,
  }: {
    type?: UserTypeEnum | undefined;
  }): Promise<User[]> {
    // console.log({ type });
    return this.prisma.user.findMany({
      where: {
        type: type
          ? {
              equals: type,
            }
          : undefined,
      },
    });
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
