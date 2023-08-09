import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const config = new ConfigService();

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt',
      property: 'user',
    }),
    JwtModule.register({
      global: true,
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
