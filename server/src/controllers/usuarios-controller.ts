import { Request, Response } from "express"
import { createUsuarioDTO } from "../schemas/usuarios-schemas"
import { CustomResponse } from "../models/response-model"
import UsuariosService from "../services/usuarios-service"

class UsuariosController {
    async createUsuario(req: Request, res: Response) {
        try {
            const usuario: createUsuarioDTO = req.body
            const result = await UsuariosService.createUsuario(usuario)

            if (Array.isArray(result)) {
                return res.status(400).json(new CustomResponse(400, "Erro de Validação", result))
            }
            return res.status(201).json(new CustomResponse(201, `Cliente cadastrado com sucesso`, { affectedRows: result.affectedRows, insertId: result.insertId }))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id)
            const result = await UsuariosService.getUsuario(id)
            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Usuário não encontrado"))
            }
            return res.status(200).json(new CustomResponse(200, `Usuário de id ${id}`, result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }

    }

    async login(req: Request, res: Response) {
        try {
            const {email , senha} = req.body
            const result = await UsuariosService.login(email, senha)
            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Email ou Senha incorreto"))
            }
            return res.status(200).json(new CustomResponse(200, `Login feito com sucesso`, result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }

    }

}

export default new UsuariosController()