import express, { Application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { appRouter } from "./routes";
import { configDotenv } from "dotenv";
configDotenv()

export const app: Application = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie']
}))

app.use("/api", appRouter)