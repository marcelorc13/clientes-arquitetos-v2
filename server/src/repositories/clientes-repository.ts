import { RowDataPacket } from "mysql2";
import Database from "../db/database"
import { clientesResponseDTO } from "../schema/clientes-schema";

class ClientesRespository {
    async getAllClientes(): Promise<clientesResponseDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`SELECT * FROM clientes`)
        return res as clientesResponseDTO[];
    }
    async getCliente(id: number): Promise<clientesResponseDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`
                SELECT * FROM clientes
                WHERE id_cliente = ?
                `, [id])
        return res as clientesResponseDTO[];
    }
}

export default new ClientesRespository