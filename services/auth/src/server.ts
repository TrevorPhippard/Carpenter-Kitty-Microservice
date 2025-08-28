import express from "express";
import cors from "cors";
import listRoutes from "./routeLister";

// import client from "prom-client";
import authRoutes from "./auth.controller";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (_req, res) => res.send("Auth service is running"));

// client.collectDefaultMetrics();

// app.get("/metrics", async (_req, res) => {
//   res.set("Content-Type", client.register.contentType);
//   res.end(await client.register.metrics());
// });
listRoutes(app);

export default app;

const PORT = parseInt(process.env.PORT || "4001", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth service listening on port ${PORT}`);
});
