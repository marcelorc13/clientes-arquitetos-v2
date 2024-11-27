export interface FetchResponseType {
    status: number,
    message: string,
    data?: [ClienteResponseType]
}

export interface ClienteResponseType {
    id_cliente: number,
    nome_completo: string,
    telefone: string,
    categoria: string,
    empresa: string | null,
    email: string | null,
    cpf: number | null,
    cnpj: number | null,
    instagram: string | null,
    site: string | null,
    endereco: string | null,
    aniversario: Date | null,
    linkedin: string | null,
    observacoes: string | null,
    data_de_cadastro: Date
}
