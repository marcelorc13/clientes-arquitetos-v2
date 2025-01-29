import { ClienteResponseType } from "@/models/response-model"

export const downloadExcelFile = async (clientes: ClienteResponseType[]) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate/xlsx`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientes)
        })

        if (!response.ok) {
            return false
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'cliente.xlsx'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)

        return true
    }
    catch (err) {
        console.error("Erro ao fazer o download", err)
        throw err
    }
}