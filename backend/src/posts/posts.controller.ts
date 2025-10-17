import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { CommentsService } from "../comments/comments.service";

@Controller("api/posts")
export class PostsController {
  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  @Get()
  async getAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  async getOne(@Param("id") id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Post(":id/comments")
  async addComment(
    @Param("id") id: string,
    @Body() body: { userId: string; content: string }
  ) {
    // delegate to CommentsService for single responsibility
    return this.commentsService.create({
      postId: id,
      userId: body.userId,
      content: body.content,
    });
  }
}
