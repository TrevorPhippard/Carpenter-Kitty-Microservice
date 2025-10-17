import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NetworkService {
  constructor(private prisma: PrismaService) {}

  async getConnections(userId: string) {
    return this.prisma.connection.findMany({
      where: {
        OR: [{ userAId: userId }, { userBId: userId }],
      },
      include: {
        userA: { select: { id: true, fullName: true, avatarUrl: true } },
        userB: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    });
  }

  async getInvitations(userId: string) {
    const invites = await (this.prisma as any).invitation.findMany({
      where: { recipientId: userId, status: "PENDING" },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    });
    return invites;
  }

  async getSuggestions(userId: string) {
    // Suggest random users not already connected or invited
    const connectedIds: { userAId: string; userBId: string }[] =
      await this.prisma.connection.findMany({
        where: { OR: [{ userAId: userId }, { userBId: userId }] },
        select: { userAId: true, userBId: true },
      });

    const invitedIds: { recipientId: string }[] = await (
      this.prisma as any
    ).invitation.findMany({
      where: { senderId: userId },
      select: { recipientId: true },
    });

    const excluded: Set<string> = new Set<string>([
      userId,
      ...connectedIds.map((c) =>
        c.userAId === userId ? c.userBId : c.userAId
      ),
      ...invitedIds.map((i) => i.recipientId),
    ]);
    console.log("connectedIds", this.prisma.user);

    return this.prisma.user.findMany({
      where: { id: { notIn: Array.from(excluded) } },
      take: 10,
      select: { id: true, fullName: true, avatarUrl: true, title: true },
    });
  }

  async sendInvite(senderId: string, targetId: string) {
    if (senderId === targetId) throw new Error("Cannot invite yourself");

    const existing = await (this.prisma as any).invitation.findFirst({
      where: {
        OR: [
          { senderId, recipientId: targetId },
          { senderId: targetId, recipientId: senderId },
        ],
      },
    });
    if (existing) throw new Error("Invite already exists");

    return (this.prisma as any).invitation.create({
      data: {
        senderId,
        recipientId: targetId,
        status: "PENDING",
      },
    });
  }

  async acceptInvite(userId: string, inviteId: string) {
    const invite = await (this.prisma as any).invitation.findUnique({
      where: { id: inviteId },
    });
    if (!invite || invite.recipientId !== userId)
      throw new NotFoundException("Invitation not found");

    await (this.prisma as any).invitation.update({
      where: { id: inviteId },
      data: { status: "ACCEPTED" },
    });

    return this.prisma.connection.create({
      data: { userAId: invite.senderId, userBId: invite.recipientId },
      include: {
        userA: {
          select: { id: true, fullName: true, avatarUrl: true, title: true },
        },
        userB: {
          select: { id: true, fullName: true, avatarUrl: true, title: true },
        },
      },
    });
  }

  async declineInvite(userId: string, inviteId: string) {
    const invite = await this.prisma.invitation.findUnique({
      where: { id: inviteId },
    });
    if (!invite || invite.recipientId !== userId)
      throw new NotFoundException("Invitation not found");

    return (this.prisma as any).invitation.update({
      where: { id: inviteId },
      data: { status: "DECLINED" },
    });
  }
}
