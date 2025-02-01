'use client'

import { FormEvent, useState } from "react";
import "./login.css"
import { loginUsuarioDTO, usuarioDTO } from "@/schemas/usuarios-schemas";
import { login } from "@/services/usuarios";
import { FetchResponseType } from "@/models/response-model";
import toast from "react-hot-toast";
import { useRedirect } from "@/hooks/useRedirect";

const LoginClient = () => {

    const [usuario, setUsuario] = useState<loginUsuarioDTO>({
        email: '',
        senha: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUsuario((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res: FetchResponseType<usuarioDTO> = await login(usuario)
            if (res.status == 404 || res.status == 500) {
                return toast.error(res.message)
            }
            useRedirect('/clientes')
            return toast.success(res.message)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="flex items-center justify-center w-full h-screen bg-slate-300">
            <div className="flex flex-col gap-4 bg-slate-200 shadow-lg rounded-lg items-center justify-center w-2/4 h-2/4">
                <h2 className="text-3xl font-semibold pb-6">Login</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">
                    <input onChange={handleChange} type="email" placeholder="Email" name="email" />
                    <input onChange={handleChange} type="password" placeholder="Senha" name="senha" />
                    <input type="submit" value="Enviar" className="bg-slate-700 py-2 text-slate-200 rounded-xl font-semibold cursor-pointer hover:bg-slate-200 hover:text-slate-700 border border-slate-700 transition duration-200" />
                </form>
            </div>
        </main>
    );
};

export default LoginClient;