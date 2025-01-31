import { Router } from "express";
import UsuariosController from "../controllers/usuarios-controller";

export const usuariosRouter = Router()

usuariosRouter.post("/cadastro", UsuariosController.createUsuario)
usuariosRouter.get("/:id", UsuariosController.getUser)
usuariosRouter.post("/login", UsuariosController.login)