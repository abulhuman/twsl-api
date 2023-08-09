import { UserTypeEnum } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  // IsStrongPassword,
  IsUppercase,
  ValidateIf,
} from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsUppercase()
  companyName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;

  @ValidateIf((o) => o.type === UserTypeEnum.MANUFACTURER)
  @IsNotEmpty()
  @IsString()
  address?: string | undefined;
}
