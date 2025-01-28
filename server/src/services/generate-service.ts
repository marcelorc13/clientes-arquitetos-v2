import ExcelJS from "exceljs"
import { clientesResponseDTO } from "../schemas/clientes-schemas";

class GenerateService {
    async generateXlsx(clientes: clientesResponseDTO[]) {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Dados')

        worksheet.columns = [
            { header: "Nome Completo", key: "nome_completo", width: 20 },
            { header: "Telefone", key: "telefone", width: 14 },
            { header: "Categoria", key: "categoria", width: 10 },
            { header: "Empresa", key: "empresa", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "CPF", key: "cpf", width: 14 },
            { header: "CNPJ", key: "cnpj", width: 18 },
            { header: "Instagram", key: "instagram", width: 20 },
            { header: "Site", key: "site", width: 30 },
            { header: "Endereço", key: "endereco", width: 30 },
            { header: "Aniversário", key: "aniversario", width: 10 },
            { header: "Linkedin", key: "linkedin", width: 30 },
            { header: "Observações", key: "observacoes", width: 40 }
        ]

        try {
            clientes.map((cliente) => {
                worksheet.addRow({
                    nome_completo: cliente.nome_completo,
                    telefone: cliente.telefone,
                    categoria: cliente.categoria,
                    empresa: cliente.empresa,
                    email: cliente.email || '',
                    cpf: cliente.cpf || '',
                    cnpj: cliente.cnpj || '',
                    instagram: cliente.instagram || '',
                    site: cliente.site || '',
                    endereco: cliente.endereco || '',
                    aniversario: cliente.aniversario || '',
                    linkedin: cliente.linkedin || '',
                    observacoes: cliente.observacoes || ''
                })
            })
            return await workbook.xlsx.writeBuffer()
        }
        catch (err) {
            return err
        }
    }
}

export default new GenerateService()
