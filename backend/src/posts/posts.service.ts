import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true, comments: { include: { user: true } } },
    });
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true, comments: { include: { user: true } } },
    });
  }

  async create(data: {
    userId: string;
    text?: string;
    content?: string;
    media?: string[];
    comments?: string[];
    likes?: number;
  }) {
    const { ...rest } = data;
    const createData: any = { ...rest };
    return this.prisma.post.create({ data: createData });
  }
}
