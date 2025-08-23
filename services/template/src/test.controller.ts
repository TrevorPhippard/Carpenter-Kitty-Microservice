import express, { Request, Response } from "express";
import { testRoute } from "./test.service";

const router = express.Router();

router.post("/test", async (req: Request, res: Response) => {
  try {
    const { testString } = req.body;
    if (!testString) {
      return res.status(400).json({ error: "parameter required" });
    }

    const result = await testRoute(testString);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "test failed" });
  }
});

export default router;
