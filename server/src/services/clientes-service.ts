import { ZodIssue } from "zod"
import ClientesRepository from "../repositories/clientes-repository"
import { clientesResponseDTO, createClienteDTO, createClienteSchema } from "../schemas/clientes-schemas"
import { ResultSetHeader } from "mysql2"

class ClientesService {
    async getAllClientes(): Promise<clientesResponseDTO[] | null> {
        const res = await ClientesRepository.getAllClientes()
        if (res.length == 0) {
            return null
        }
        return res
    }

    async getCliente(id: number): Promise<clientesResponseDTO | null> {
        const [res] = await ClientesRepository.getCliente(id)
        if (!res) {
            return null
        }
        return res
    }

    async createCliente(data: createClienteDTO): Promise<ResultSetHeader | ZodIssue[]> {
        const validar = createClienteSchema.safeParse(data)

        if (!validar.success) {
            return validar.error.issues
        }
        const res = await ClientesRepository.createCliente(data)

        return res;

    }
}

export default new ClientesService()