import { z } from "zod"

const setNull = (val: string | Date | null | undefined) => val === "" ? null : val

export const createClienteSchema = z.object({
    nome_completo: z.string().min(5, "O nome deve conter no mínimo 5 caracteres").max(150),
    telefone: z.string().max(14),
    email: z.string().toLowerCase().max(120).transform((val) => setNull(val)).nullish(),
    cpf: z.string().max(14).transform((val) => setNull(val)).nullish(),
    cnpj: z.string().max(18).transform((val) => setNull(val)).nullish(),
    instagram: z.string().max(120).transform((val) => setNull(val)).nullish(),
    site: z.string().max(255).transform((val) => setNull(val)).nullish(),
    endereco: z.string().max(255).transform((val) => setNull(val)).nullish(),
    aniversario: z.union([z.coerce.date(), z.string()]).transform((val) => setNull(val)).nullish(),
    linkedin: z.string().max(255).transform((val) => setNull(val)).nullish(),
    observacoes: z.string().max(500).transform((val) => setNull(val)).nullish()
})

export type createClienteDTO = z.infer<typeof createClienteSchema>