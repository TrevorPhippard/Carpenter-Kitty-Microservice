import express, { Request, Response } from "express";
import { registerUser, authenticateUser } from "./auth.service";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Email, username and password are required" });
    }

    const result = await registerUser(email, username, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Registration failed" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await authenticateUser(email, password);
    if (!result) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

export default router;
