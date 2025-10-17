import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
// import { CommentsController } from "./comments.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [CommentsService, PrismaService],
  // controllers: [CommentsController],
  exports: [CommentsService], // 👈 makes it available to other modules
})
export class CommentsModule {}
