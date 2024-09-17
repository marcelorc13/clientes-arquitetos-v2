import z from "zod"

export const clientesResponseSchema = z.object({
    id_cliente: z.number(),
    nome_completo: z.string(),
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

export const createClienteSchema = z.object({
    nome_completo: z.string().min(5).max(150),
    cpf: z.string().max(14).nullable().optional(),
    cnpj: z.string().max(18).nullable().optional(),
    email: z.string().toLowerCase().max(120).email(),
    instagram: z.string().max(120).nullable().optional(),
    site: z.string().max(255).nullable().optional(),
    endereco: z.string().max(255).nullable().optional(),
    aniversario: z.string().date().nullable().optional(),
    linkedin: z.string().max(255).nullable().optional(),
    observacoes: z.string().max(500).nullable().optional()
})

export type clientesResponseDTO = z.infer<typeof clientesResponseSchema>
export type createClienteDTO = z.infer<typeof createClienteSchema>