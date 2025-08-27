import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// import client from "prom-client";
import authRoutes from "./auth.controller";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api/v1/auth", authRoutes);

// client.collectDefaultMetrics();

// app.get("/metrics", async (_req, res) => {
//   res.set("Content-Type", client.register.contentType);
//   res.end(await client.register.metrics());
// });

const PORT = parseInt(process.env.PORT || "4001", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Profile service listening on port ${PORT}`);
});
