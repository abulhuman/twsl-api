import { Prisma, PrismaClient } from '@prisma/client';
import { AbstractSeeder } from 'src/prisma/abstract.seeder';
import {
  DEFAULT_TRANSPORTER_USER,
  DEFAULT_MANUFACTURER_USER,
} from './users.seed.data';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from 'src/auth/password.service';

export class UsersSeeder extends AbstractSeeder {
  constructor(db: PrismaClient) {
    super(db);
    this.passwordService = new PasswordService(new ConfigService());
  }

  private passwordService: PasswordService;

  async seed() {
    await this.seedUser(DEFAULT_MANUFACTURER_USER);
    console.log(
      'DEFAULT_MANUFACTURER_USER Company = ',
      DEFAULT_MANUFACTURER_USER.companyName,
    );
    await this.seedUser(DEFAULT_TRANSPORTER_USER);
    console.log(
      'DEFAULT_TRANSPORTER_USER Company = ',
      DEFAULT_TRANSPORTER_USER.companyName,
    );
  }

  private async seedUser(defaultUserCreateData: Prisma.UserCreateInput) {
    const password = await this.passwordService.hashPassword('super-secret');

    const timeout = setTimeout(async () => {
      if (password.length) {
        clearTimeout(timeout);
      }
      await this.db.user.upsert({
        where: {
          email: defaultUserCreateData.email,
        },
        update: {
          ...defaultUserCreateData,
          password: password,
        },
        create: {
          ...defaultUserCreateData,
          password: password,
        },
      });
    }, 10);
  }
}
