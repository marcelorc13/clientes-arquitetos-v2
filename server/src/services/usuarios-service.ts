import bcrypt from "bcrypt"
import { createUsuarioDTO, createUsuarioSchema, usuarioDTO } from "../schemas/usuarios-schemas"
import UsuarioRepository from "../repositories/usuarios-repository"
import { ZodIssue } from "zod"
import { ResultSetHeader } from "mysql2"
import { Hash } from "crypto"

class UsuariosService {

    async createUsuario(usuario: createUsuarioDTO): Promise<ResultSetHeader | ZodIssue[]> {
        const validar = createUsuarioSchema.safeParse(usuario)

        if (!validar.success) {
            return validar.error.issues
        }
        const { nome, email, senha } = usuario

        const hash = await bcrypt.hash(senha, 13)

        const res = await UsuarioRepository.createUser({ nome, email, senha: hash })
        return res
    }

    async getUsuario(id: number): Promise<usuarioDTO | null> {
        const [res] = await UsuarioRepository.getUsuario(id)
        if (!res) {
            return null
        }
        return res
    }

    async login(email: string, senha: string): Promise<usuarioDTO | null> {
        const [res] = await UsuarioRepository.login(email)
        if (!res) {
            return null
        }
        const isValid = bcrypt.compare(senha, res.senha)

        if (!isValid) {
            return null
        }

        return res
    }

}

export default new UsuariosService()