import express from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";

import testRoutes from "./test.controller";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api/template", testRoutes);

const PORT = parseInt(process.env.PORT || "1337", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`test service listening on port ${PORT}`);
});
