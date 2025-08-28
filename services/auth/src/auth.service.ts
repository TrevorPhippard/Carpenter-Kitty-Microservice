import bcrypt from "bcryptjs";
import prisma from "./prismaClient";
import { signJwt } from "./jwt";

export async function registerUser(
  email: string,
  username: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  });
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = signJwt({ userId: user.id, email: user.email });
  return { token, user };
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
