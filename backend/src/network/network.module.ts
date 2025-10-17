import { Module } from "@nestjs/common";
import { NetworkController } from "./network.controller";
import { NetworkService } from "./network.service";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [NetworkService, PrismaService],
  controllers: [NetworkController],
  exports: [NetworkService],
})
export class NetworkModule {}
