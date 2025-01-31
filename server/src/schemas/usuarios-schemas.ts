import z from "zod"

export const createUsuarioSchema = z.object({
    nome: z.string().min(3, "O nome deve conter no mínimo 3 caracteres").max(40, "O nome deve conter no máximo 40 caracteres"),
    email: z.string().email(),
    senha: z.string().min(3, "A senha deve conter no mínimo 6 caracteres").max(40, "A senha deve conter no máximo 40 caracteres")
})

export const usuarioSchema = z.object({
    id_usuario: z.number().nullish(), 
    nome: z.string().nullish(),
    email: z.string().email(),
    senha: z.string()
})

export type createUsuarioDTO = z.infer<typeof createUsuarioSchema>
export type usuarioDTO = z.infer<typeof usuarioSchema>