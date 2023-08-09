import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserTypeEnum } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from './types/auth-payload';
import { RegistrationDto } from './dto/Registration.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login({ email, password }: LoginDto): Promise<AuthPayload> {
    const user = await this.validateUser({ email, password });
    return this.generateTokens({
      sub: user.id,
      email,
      type: user.type,
      address: user.address,
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
      email: user.email,
      sub: user.id,
      type: user.type,
    });
  }

  private async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const passwordIsValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );
    if (!passwordIsValid) throw new BadRequestException('Invalid password');
    return user;
  }

  private generateTokens(jwtPayload: {
    sub: any;
    email: string;
    type: UserTypeEnum;
    address?: string;
  }): AuthPayload {
    return {
      accessToken: this.generateAccessToken(jwtPayload),
      refreshToken: this.generateRefreshToken(jwtPayload),
    };
  }

  private generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
    });
  }

  private generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
    });
  }

  refreshToken(token: string): AuthPayload {
    try {
      const jwtPayload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens(jwtPayload);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
