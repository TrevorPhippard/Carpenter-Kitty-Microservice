import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("api")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  async me() {
    return this.usersService.me();
  }

  @Get("users")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get("users/:id")
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }
}
