import { IsEnum, IsString } from "class-validator";
import { RequestStatus } from "@prisma/client";

export class CreateInvitationDto {
  @IsString()
  senderId!: string;

  @IsString()
  recipientId!: string;

  @IsEnum(RequestStatus)
  status!: RequestStatus;
}

export class UpdateInvitationDto {
  @IsEnum(RequestStatus)
  status!: RequestStatus;
}

export class CreateConnectionDto {
  @IsString()
  userAId!: string;

  @IsString()
  userBId!: string;
}
