import ClientesRepository from "../repositories/clientes-repository"
import { clientesResponseDTO } from "../schema/clientes-schema"

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
}

export default new ClientesService