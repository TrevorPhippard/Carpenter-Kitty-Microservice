import prisma from "./prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export interface AuthenticatedUser {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export async function registerUser(
  email: string,
  username: string,
  password: string
): Promise<AuthenticatedUser> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    throw new Error("Email or username already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return {
    token,
    user: {
      id: Number(user.id),
      email: user.email,
      username: user.username,
    },
  };
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return {
    token,
    user: {
      id: Number(user.id),
      email: user.email,
      username: user.username,
    },
  };
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
