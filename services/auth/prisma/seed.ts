import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

async function main() {
  const username = "testuser";
  const password = "test";

  // Check if profile exists
  const existing = await prisma.user.findFirst({ where: { username } });
  const hashedPassword = await bcrypt.hash(password, 10); // salt rounds = 10

  if (!existing) {
    await prisma.user.create({
      data: {
        username: username,
        email: "test@test.com",
        password: hashedPassword,
      },
    });
    console.log("Created auth:");
  } else {
    console.log("Profile already exists:", existing);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
