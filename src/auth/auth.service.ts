import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';
// import { ConfigService } from '@nestjs/config';
import { AuthPayload } from './types/auth-payload';
import { RegistrationDto } from './dto/Registration.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    // private readonly configService: ConfigService,
  ) {}
  async login({ email, password }: LoginDto): Promise<AuthPayload> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const passwordIsValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );
    if (!passwordIsValid) throw new BadRequestException('Invalid password');
    return this.generateTokens({
      userId: user.id,
    });
  }

  async register(input: RegistrationDto): Promise<AuthPayload> {
    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );
    const user = await this.usersService.create({
      ...input,
      password: hashedPassword,
    });
    return this.generateTokens({
      userId: user.id,
    });
  }

  validateUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  generateTokens(payload: { userId: number }): AuthPayload {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: number }): string {
    return this.jwtService.sign(
      payload,
      // {
      // secret: this.configService.get('JWT_ACCESS_SECRET'),
      // expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
      // }
    );
  }

  private generateRefreshToken(payload: { userId: number }): string {
    return this.jwtService.sign(
      payload,
      // {
      // secret: this.configService.get('JWT_REFRESH_SECRET'),
      // expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
      // }
    );
  }

  refreshToken(token: string): AuthPayload {
    try {
      const { userId } = this.jwtService.verify(
        token,
        // {
        // secret: this.configService.get('JWT_REFRESH_SECRET'),
        // }
      );

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
