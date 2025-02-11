'use client'

import { FormEvent, useState } from "react";
import "./login.css"
import { loginUsuarioDTO, usuarioDTO } from "@/schemas/usuarios-schemas";
import { login } from "@/services/usuarios";
import { FetchResponseType } from "@/models/response-model";
import toast from "react-hot-toast";
import { UseRedirect } from "@/hooks/useRedirect";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setCookie } from "@/services/cookies";

const LoginClient = () => {

    const [usuario, setUsuario] = useState<loginUsuarioDTO>({
        email: '',
        senha: ''
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUsuario((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res: FetchResponseType<usuarioDTO> = await login(usuario)
            if (res.status == 404 || res.status == 500) {
                setLoading(false)
                return toast.error(res.message)
            }
            await setCookie(usuario.email)
            UseRedirect('/clientes')
            setLoading(false)
            return toast.success(res.message)
        }
        catch (err) {
            setLoading(false)
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
                    <button type="submit" className="bg-slate-700 py-2 text-slate-200 rounded-xl font-semibold cursor-pointer hover:bg-slate-200 hover:text-slate-700 border border-slate-700 transition duration-200 flex items-center justify-center">{loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Enviar'}</button>
                </form>
            </div>
        </main>
    );
};

export default LoginClient;