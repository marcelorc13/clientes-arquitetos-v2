import z from "zod"

export const clientesResponseSchema = z.object({
    id_cliente: z.number(),
    nome_completro: z.string().min(5).max(150),
    cpf: z.number().nullable(),
    cnpj: z.number().nullable(),
    email: z.string().email(),
    instagram: z.string().nullable(),
    site: z.string().nullable(),
    endereco: z.string().nullable(),
    aniversario: z.date().nullable(),
    linkedin: z.string().nullable(),
    observacoes: z.string().nullable()
})

export type clientesResponseDTO = z.infer<typeof clientesResponseSchema>