import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  title?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  title?: string;
}
