import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @IsOptional()
  @IsInt()
  likes?: number;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @IsOptional()
  @IsInt()
  likes?: number;
}
