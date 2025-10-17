import { Module } from "@nestjs/common";
import { PostsModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { NetworkModule } from "./network/network.module";
import { ProfilesModule } from "./profile/profile.module";

@Module({
  imports: [
    PrismaModule,
    PostsModule,
    UsersModule,
    NetworkModule,
    ProfilesModule,
  ],
})
export class AppModule {}
