import {
  Controller,
  Body,
  HttpCode,
  Post,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthPayload } from './types/auth-payload';
import { RegistrationDto } from './dto/Registration.dto';
import { User } from '@prisma/client';
import { Request } from 'express';
import { Public } from './public.decorator';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() input: LoginDto): Promise<AuthPayload> {
    return await this.authService.login(input);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body() input: RegistrationDto): Promise<AuthPayload> {
    return await this.authService.register(input);
  }

  @HttpCode(HttpStatus.OK)
  @Get('whoami')
  async me(@Req() req: RequestWithUser): Promise<User> {
    return req.user;
  }
}
