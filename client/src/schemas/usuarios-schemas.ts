import { z } from "zod"

export const loginUsuarioSchema = z.object({
    email: z.string().email(),
    senha: z.string()
})
export const usuarioSchema = z.object({
    id_usuario: z.number(),
    nome: z.string(),
    email: z.string().email(),
    senha: z.string()
})

export type loginUsuarioDTO = z.infer<typeof loginUsuarioSchema>
export type usuarioDTO = z.infer<typeof usuarioSchema>