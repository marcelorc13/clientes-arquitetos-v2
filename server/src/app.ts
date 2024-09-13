import express, { Application } from "express"
import { appRouter } from "./routes";

export const app: Application = express();

app.use(express.json())

app.use("/api", appRouter)