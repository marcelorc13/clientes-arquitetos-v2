import { ResultSetHeader, RowDataPacket } from "mysql2";
import Database from "../db/database"
import { clientesResponseDTO, createClienteDTO } from "../schemas/clientes-schemas";

class ClientesRespository {
    async getAllClientes(): Promise<clientesResponseDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`SELECT * FROM clientes;`)
        return res as clientesResponseDTO[]
    }

    async getCliente(id: number): Promise<clientesResponseDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`
                SELECT * FROM clientes
                WHERE id_cliente = ?;
                `, [id])
        return res as clientesResponseDTO[]
    }

    async createCliente(data: createClienteDTO): Promise<ResultSetHeader> {
        const { nome_completo, cpf, cnpj, email, categoria, empresa, telefone, instagram, site, endereco, aniversario, linkedin, observacoes } = data

        const [res] = await Database.query<ResultSetHeader>(`
            INSERT INTO clientes(nome_completo, cpf, cnpj, email, categoria, empresa, telefone, instagram, site, endereco, aniversario, linkedin, observacoes)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `, [nome_completo, cpf, cnpj, email, categoria, empresa, telefone, instagram, site, endereco, aniversario, linkedin, observacoes])

        return res
    }

    async deleteCliente(id: number) {
        const [res] = await Database.query<ResultSetHeader>(`
            DELETE FROM clientes
            WHERE id_cliente = ?;
            `, [id])
        return res
    }
}

export default new ClientesRespository()