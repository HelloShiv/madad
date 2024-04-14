import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(
  cors()
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

app.listen(process.env.EXPRESS_PORT, () => console.log(`Server ready on port ${process.env.EXPRESS_PORT}`));

// routes
import router from "./routes/user.route.js";

app.use("/", router);

export { app };
