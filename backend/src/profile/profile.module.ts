import { Module } from "@nestjs/common";
import { ProfilesService } from "./profile.service";
import { ProfilesController } from "./profile.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [ProfilesService, PrismaService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
