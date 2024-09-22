'use client'

import "./cadastro-cliente.css"
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import { createClienteDTO, createClienteSchema } from "@/schemas/clientes-schemas";
import { useState } from "react";

interface Props {

}

const CadastroClienteClient: React.FC<Props> = ({ }) => {

    const { register, reset, handleSubmit } = useForm<createClienteDTO>()

    const handleCreateCliente = async (cliente: createClienteDTO) => {
        const validData = createClienteSchema.safeParse(cliente)

        if (validData.success) {

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`, {
                    method: "POST",
                    body: JSON.stringify(validData.data),
                    headers: {
                        'content-type': 'application/json'
                    }
                })

                toast.success("Usuário criado com sucesso!")
                reset()
                return console.log(await res.json())
            }

            catch (err) {
                return console.log("Erro ao se conectar com a API")
            }
        }

        validData.error.issues.forEach((err) => {
            console.log(err)
            return toast.error(err.message)
        })

    }
    const [tipoDePessoa, setTipoDePessoa] = useState<string>("fisica")

    return (
        <main className="bg-slate-200 flex items-center justify-center h-max md:h-screen w-full">
            <section className="flex flex-col justify-between items-center gap-8 py-8 bg-slate-50 px-8 md:px-20 rounded-xl shadow-xl w-full md:w-3/4">
                <h1 className="text-lg md:text-2xl font-medium">Cadastrar Cliente</h1>
                <form onSubmit={handleSubmit(handleCreateCliente)} className="flex flex-col items-center gap-4 w-full">
                    <input type="text" {...register("nome_completo")} placeholder="Nome Completo" />
                    <input type="text" {...register("telefone")} placeholder="Telefone" />
                    <input type="text" {...register("email")} placeholder="Email" />
                    <label htmlFor="tipoDePessoa">Tipo de Pessoa:</label>
                    <select name="tipoDePessoa" id="tipoDePessoa" defaultValue={"fisica"} onChange={(e) => setTipoDePessoa(e.target.value)}>
                        <option value="fisica">Física</option>
                        <option value="juridica">Jurídica</option>
                    </select>
                    {tipoDePessoa == "fisica" ?
                        <input type="text" {...register("cpf")} placeholder="CPF" /> :

                        <input type="text" {...register("cnpj")} placeholder="CNPJ" />
                    }
                    <input type="text" {...register("instagram")} placeholder="Instagram" />
                    <input type="text" {...register("site")} placeholder="Site" />
                    <input type="text" {...register("endereco")} placeholder="Endereço" />
                    <label htmlFor="aniversario">Aniversário:</label>
                    <input type="date" {...register("aniversario")} />
                    <input type="text" {...register("linkedin")} placeholder="LinkedIn" />
                    <input type="text" {...register("observacoes")} placeholder="Observações" />

                    <button className="rounded-md py-2 px-4 bg-slate-200" type="submit">Cadastrar</button>
                </form>

            </section>
        </main>
    );
};

export default CadastroClienteClient;