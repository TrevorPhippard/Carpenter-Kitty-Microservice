import { Controller, Get, Post, Param, Req } from "@nestjs/common";
import { NetworkService } from "./network.service";

@Controller("api/network")
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Get("connections/:id")
  getConnections(@Param("id") id: string) {
    const userId = id ?? "demo-user-id";
    return this.networkService.getConnections(userId);
  }

  @Get("invitations/:id")
  getInvitations(@Param("id") id: string) {
    const userId = id ?? "demo-user-id";
    return this.networkService.getInvitations(userId);
  }

  @Get("suggestions/:id")
  getSuggestions(@Param("id") id: string) {
    const userId = id ?? "demo-user-id";
    return this.networkService.getSuggestions(userId);
  }

  @Post("invite/:id")
  sendInvite(@Param("id") id: string) {
    const userId = id ?? "demo-user-id";
    return this.networkService.sendInvite(userId, id);
  }

  @Post("accept/:id")
  acceptInvitation(@Param("id") id: string) {
    const userId = id ?? "demo-user-id";
    return this.networkService.acceptInvite(userId, id);
  }

  @Post("decline/:id")
  declineInvite(@Param("id") id: string) {
    const userId = id ?? "demo-user-id";
    return this.networkService.declineInvite(userId, id);
  }
}
