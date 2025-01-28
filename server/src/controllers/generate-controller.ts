import { Request, Response } from "express"
import { clientesResponseDTO } from "../schemas/clientes-schemas"
import GenerateService from "../services/generate-service"
import { CustomResponse } from "../models/response-model"

export class GenerateController {
    async generateXlsx(req: Request, res: Response) {
        try {
            const cliente: clientesResponseDTO[] = req.body
            if (!Array.isArray(cliente)) {
                return res.status(400).json(new CustomResponse(400, "Dados de clientes inválidos"))
            }

            const buffer = await GenerateService.generateXlsx(cliente)

            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=clientes.xlsx'
            )

            return res.send(buffer)
        }
        catch (err) {
            return res.status(500).json(new CustomResponse(500, "Erro no download do arquivo"))
        }
    }
}

export default new GenerateController()
