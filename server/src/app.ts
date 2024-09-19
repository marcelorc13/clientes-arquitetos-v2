import express, { Application } from "express"
import cors from "cors"
import { appRouter } from "./routes";
import { configDotenv } from "dotenv";
configDotenv()

export const app: Application = express();

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true
}))

app.use("/api", appRouter)