import { Request, Response } from "express"
import ClientesService from "../services/clientes-service"
import { CustomResponse } from "../models/response-model"
import { createClienteDTO } from "../schemas/clientes-schemas"

class ClientesController {
    async getAllClientes(req: Request, res: Response) {
        try {
            const result = await ClientesService.getAllClientes()
            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Nenhum cliente cadastrado no banco"))

            }
            return res.status(200).json(new CustomResponse(200, "Todos os clientes do banco", result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }

    async getCliente(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id)
            const result = await ClientesService.getCliente(id)
            if (!result) {
                return res.status(404).json(new CustomResponse(404, "Cliente não encontrado"))
            }
            return res.status(200).json(new CustomResponse(200, `Cliente de id ${id}`, result))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }

    async createCliente(req: Request, res: Response) {
        try {
            const cliente: createClienteDTO = req.body
            const result = await ClientesService.createCliente(cliente)

            if (Array.isArray(result)) {
                return res.status(400).json(new CustomResponse(400, "Erro de Validação", result))
            }

            return res.status(201).json(new CustomResponse(200, `Cliente cadastrado com sucesso`, { affectedRows: result.affectedRows, insertId: result.insertId }))
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro desconhecido", err))
        }
    }

}

export default new ClientesController()