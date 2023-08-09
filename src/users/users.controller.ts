import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserTypeEnum } from '@prisma/client';
import { Request as IRequest } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Request() req: IRequest) {
    return this.usersService.findAll({
      type: req.query._type as UserTypeEnum,
    });
  }
}
