'use client'

import "./cadastro-cliente.css"
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import { createClienteDTO, createClienteSchema } from "@/schemas/clientes-schemas";
import { useState } from "react";
import { ClienteResponseType, FetchResponseType } from "@/models/response-model";
import ReactInputMask from "react-input-mask";

const CadastroClienteClient: React.FC = ({ }) => {

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
                const result: FetchResponseType<ClienteResponseType> = await res.json()
                if (result.status == 500) {
                    console.log(result.message)
                    return toast.error("Erro desconhecido")
                }
                if (result.status == 400) {
                    return toast.error("Erro de validacao")
                }

                console.log(result)
                reset()
                return toast.success("Usuário criado com sucesso!")
            }

            catch (err) {
                return console.log("Erro ao se conectar com a API")
            }
        }

        validData.error.issues.forEach((err) => {
            return toast.error(err.message)
        })

    }
    const [tipoDePessoa, setTipoDePessoa] = useState<string>("fisica")

    return (
        <main className=" flex items-center justify-end w-full">
            <section className="flex flex-col justify-between items-center gap-8 py-8 w-full md:w-3/4 lg:w-4/5 px-8 md:px-16 lg:px-24 ">
                <h1 className="text-lg md:text-2xl font-medium">Cadastrar Cliente</h1>
                <form onSubmit={handleSubmit(handleCreateCliente)} className="flex flex-col items-center gap-4 w-full">
                    <input type="text" {...register("nome_completo")} placeholder="Nome Completo" />
                    <ReactInputMask mask={'(99)99999-9999'}{...register("telefone")} placeholder="Telefone" />
                    <label htmlFor="categoria">Categoria: </label>
                    <select
                        id="categoria"
                        defaultValue={"fisica"}
                        {...register("categoria")}>
                        <option value="Cliente">Cliente</option>
                        <option value="Arquiteto">Arquiteto</option>
                        <option value="Fornecedor">Fornecedor</option>
                    </select>
                    <input type="text" {...register("empresa")} placeholder="Empresa" />
                    <input type="text" {...register("email")} placeholder="Email" autoComplete="off" />
                    <label htmlFor="tipoDePessoa">Tipo de Pessoa:</label>
                    <select
                        id="tipoDePessoa"
                        defaultValue={"fisica"}
                        onChange={(e) => setTipoDePessoa(e.target.value)}>
                        <option value="fisica">Física</option>
                        <option value="juridica">Jurídica</option>
                    </select>
                    {tipoDePessoa == "fisica" ?
                        <ReactInputMask mask={'999.999.999-99'} {...register("cpf")} placeholder="CPF" />
                        :
                        <ReactInputMask
                            mask={'99.999.999/9999-99'} {...register("cnpj")} placeholder="CNPJ" />
                    }
                    <input type="text" {...register("instagram")} placeholder="Instagram" />
                    <input type="text" {...register("site")} placeholder="Site" />
                    <input type="text" {...register("endereco")} placeholder="Endereço" />
                    <label htmlFor="aniversario">Aniversário:</label>
                    <input id="aniversario" type="date" {...register("aniversario")} />
                    <input type="text" {...register("linkedin")} placeholder="LinkedIn" />
                    <input type="text" {...register("observacoes")} placeholder="Observações" />

                    <button className="rounded-md py-2 px-4 bg-slate-200" type="submit">Cadastrar</button>
                </form>

            </section>
        </main>
    );
};

export default CadastroClienteClient;