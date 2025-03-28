import z from "zod"

export const clientesResponseSchema = z.object({
    id_cliente: z.number(),
    nome_completo: z.string(),
    telefone: z.string(),
    categoria: z.string(),
    empresa: z.string(),
    email: z.string().email().nullish(),
    cpf: z.number().nullable(),
    cnpj: z.number().nullable(),
    instagram: z.string().nullable(),
    site: z.string().nullable(),
    endereco: z.string().nullable(),
    aniversario: z.date().nullable(),
    linkedin: z.string().nullable(),
    observacoes: z.string().nullable(),
    data_de_cadastro: z.date()
})

export const createClienteSchema = z.object({
    nome_completo: z.string().min(5).max(150),
    telefone: z.string().max(14),
    categoria: z.string(),
    empresa: z.string().max(120).nullish(),
    email: z.string().max(120).email().nullish(),
    cpf: z.string().max(14).nullish(),
    cnpj: z.string().max(18).nullish(),
    instagram: z.string().max(120).nullish(),
    site: z.string().max(255).nullish(),
    endereco: z.string().max(255).nullish(),
    aniversario: z.coerce.date().nullish(),
    linkedin: z.string().max(255).nullish(),
    observacoes: z.string().max(500).nullish()
})

export type clientesResponseDTO = z.infer<typeof clientesResponseSchema>
export type createClienteDTO = z.infer<typeof createClienteSchema>