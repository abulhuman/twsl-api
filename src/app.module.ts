import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { securityConfigSchema } from './common/configs/security.config.schema';
import * as joi from 'joi';
import { appConfigSchema } from './common/configs/app.config.schema';

const nestConfigSchema = joi.object({
  ...appConfigSchema,
  ...securityConfigSchema,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: nestConfigSchema,
    }),
    PrismaModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
