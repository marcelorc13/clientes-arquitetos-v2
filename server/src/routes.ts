import { Router } from "express";
import { clientesRouter } from "./routes/clientes-routes";
import { generateRouter } from "./routes/generate-routes";
import { usuariosRouter } from "./routes/usuarios-routes";

export const appRouter = Router()

appRouter.use("/clientes", clientesRouter)
appRouter.use("/generate", generateRouter)
appRouter.use("/usuarios", usuariosRouter)