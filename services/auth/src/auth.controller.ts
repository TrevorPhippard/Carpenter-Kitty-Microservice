import express, { Request, Response } from "express";
import {
  signUp,
  signIn,
  getUser,
  signOut,
  resetPassword,
  getSessions,
} from "./auth.service";
import { authenticateJWT, AuthRequest } from "./jwt";

const router = express.Router();

const handleRequest = (fn: Function) => async (req: Request, res: Response) => {
  try {
    const result = await fn(req.body || req.headers);
    res.json(result);
  } catch (err: any) {
    res
      .status(err.status || 400)
      .json({ error: err.message || "Something went wrong" });
  }
};

router.post("/sign-up/email", handleRequest(signUp));

router.post("/sign-in/email", handleRequest(signIn));

router.get("/get-session", handleRequest(getSessions));

router.get("/me", authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const result = await getUser(req.headers.authorization!.split(" ")[1]);
    res.json(result);
  } catch (err: any) {
    res
      .status(err.status || 400)
      .json({ error: err.message || "Something went wrong" });
  }
});

router.post("/sign-out", handleRequest(signOut));

router.post("/reset-password", handleRequest(resetPassword));

export default router;
