import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // return the first user as "me" for demo purposes
  async me() {
    const user = await this.prisma.user.findFirst();
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({ take: 10 });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
