import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        title: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            location: true,
            website: true,
            coverUrl: true,
            skills: true,
            data: true,
          },
        },
      },
    });

    if (!user) return null;

    const posts = await this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const postsCount = await this.prisma.post.count({ where: { userId } });
    const connectionsCount = await this.prisma.connection.count({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
    });

    return {
      user,
      profile: user.profile,
      posts,
      postsCount,
      connectionsCount,
    };
  }
}
