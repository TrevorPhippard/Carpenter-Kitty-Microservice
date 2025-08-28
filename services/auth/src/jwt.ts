import jwt, { SignOptions } from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export function signJwt(payload: object, expiresIn: string = "1h"): string {
  const options: SignOptions = { expiresIn: expiresIn as any }; // cast to bypass TS
  return jwt.sign(payload, secret, options);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
