import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface JwtPayload {
  userId: number;
}

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION as any });
};

export const signUp = async ({ email, username, password }: SignUpRequest) => {
  console.log("Signing up user:", { email, username });
  if (!email || !password)
    throw { status: 400, message: "Email and password are required" };
  const hashed = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: { email, username, password: hashed },
    });
    return { token: generateToken(user.id) };
  } catch (err: any) {
    if (err.code === "P2002")
      throw { status: 409, message: "User already exists" };
    throw { status: 500, message: "Internal server error" };
  }
};

export const signIn = async ({ email, password }: SignInRequest) => {
  if (!email || !password)
    throw { status: 400, message: "Email and password are required" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: "Invalid credentials" };

  return { token: generateToken(user.id) };
};

export const getUser = async (token: string) => {
  if (!token) throw { status: 401, message: "No token provided" };
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) throw { status: 404, message: "User not found" };
    return { id: user.id, email: user.email };
  } catch (err: any) {
    if (err.name === "JsonWebTokenError")
      throw { status: 401, message: "Invalid token" };
    throw { status: 500, message: "Internal server error" };
  }
};

export const signOut = async () => ({ message: "Signed out successfully" });

export const resetPassword = async ({
  email,
  newPassword,
}: ResetPasswordRequest) => {
  if (!email || !newPassword)
    throw { status: 400, message: "Email and newPassword are required" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 404, message: "User not found" };

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { email }, data: { password: hashed } });

  return { message: "Password updated successfully" };
};
