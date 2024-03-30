import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "15kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// routes
import router from "./routes/user.route.js";

app.use("/" , router);

export { app };
