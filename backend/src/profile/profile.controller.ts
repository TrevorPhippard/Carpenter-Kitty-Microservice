import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { ProfilesService } from "./profile.service";

@Controller("api")
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get("profiles/:id")
  async getProfile(@Param("id") id: string) {
    const data = await this.profilesService.getProfile(id);
    if (!data) throw new NotFoundException("Profile not found");
    return data;
  }
}
