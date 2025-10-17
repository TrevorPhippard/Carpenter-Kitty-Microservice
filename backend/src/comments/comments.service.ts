import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommentDto, UpdateCommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  // Create a new comment using DTO
  async create(createCommentDto: CreateCommentDto) {
    const { postId, userId, content } = createCommentDto;

    const comment = await this.prisma.comment.create({
      data: {
        postId,
        userId,
        content,
      },
      include: { user: true }, // include user relation
    });

    return comment;
  }

  // Update an existing comment by ID using DTO
  async update(commentId: string, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;

    const comment = await this.prisma.comment.update({
      where: { id: commentId },
      data: { content },
      include: { user: true },
    });

    return comment;
  }

  // Get all comments for a post
  async findByPost(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
  }

  // Optional: Delete a comment
  async remove(commentId: string) {
    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
