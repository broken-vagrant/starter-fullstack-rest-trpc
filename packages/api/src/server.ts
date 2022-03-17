import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./routers/_app";
import { createContext } from "./context";
import cors from "cors";

const app = express();

app.use(cors());

console.log(process.env.SHADOW_DATABASE_URL);

app.use((req, _res, next) => {
  // request logger
  console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

  next();
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.get("/", (_req, res) => res.send("hello"));

export default app;
