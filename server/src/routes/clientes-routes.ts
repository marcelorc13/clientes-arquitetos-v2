import { Router } from "express";
import ClientesController from "../controllers/clientes-controller";

export const clientesRouter = Router()

clientesRouter.get("/", ClientesController.getAllClientes)
clientesRouter.get("/:id", ClientesController.getCliente)
clientesRouter.post("/", ClientesController.createCliente)
clientesRouter.delete("/:id", ClientesController.deleteCliente)
