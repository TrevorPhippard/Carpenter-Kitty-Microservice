import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { CommentsModule } from "../comments/comments.module"; // 👈 import it

@Module({
  imports: [CommentsModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
