import { loginUsuarioDTO } from "@/schemas/usuarios-schemas";

export const login = async (usuario: loginUsuarioDTO) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
        })
        return res.json()
    }
    catch (err) {
        console.log("Error inesperado")
        throw err
    }
}