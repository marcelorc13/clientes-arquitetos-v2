import { Router } from "express";
import { clientesRouter } from "./routes/clientes-routes";

export const appRouter = Router()

appRouter.use("/clientes", clientesRouter)