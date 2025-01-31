import Database from "../db/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { usuarioDTO } from "../schemas/usuarios-schemas"

class UsuariosRespository {
    async createUser(usuario: usuarioDTO): Promise<ResultSetHeader> {
        const { nome, email, senha } = usuario
        const [res] = await Database.query<ResultSetHeader>(`
            INSERT INTO usuarios(nome, email, senha) 
            VALUES(?, ?, ?)
            `, [nome, email, senha])
        return res
    }

    async getUsuario(id: number): Promise<usuarioDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`
            SELECT * FROM usuarios
            WHERE id_usuario = ?
            `, [id])
        return res as usuarioDTO[]
    }

    async login(email: string): Promise<usuarioDTO[]> {
        const [res] = await Database.query<RowDataPacket[]>(`
            SELECT * FROM usuarios
            WHERE email = ?
            `, [email])
        return res as usuarioDTO[]
    }

}

export default new UsuariosRespository()