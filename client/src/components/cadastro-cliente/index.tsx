'use client'

import "./cadastro-cliente.css"
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import { createClienteDTO, createClienteSchema } from "@/schemas/clientes-schemas";

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
            return toast.error(err.message)
        })
    }

    return (
        <main>
            <form onSubmit={handleSubmit(handleCreateCliente)} className="flex flex-col gap-2">
                <input type="text" {...register("nome_completo")} placeholder="Nome Completo" />
                <input type="text" {...register("cpf")} placeholder="CPF" />
                <input type="text" {...register("cnpj")} placeholder="CNPJ" />
                <input type="text" {...register("email")} placeholder="Email" />
                <input type="text" {...register("telefone")} placeholder="Telefone" />
                <input type="text" {...register("instagram")} placeholder="Instagram" />
                <input type="text" {...register("site")} placeholder="Site" />
                <input type="text" {...register("endereco")} placeholder="Endereço" />
                <input type="date" {...register("aniversario")} />
                <input type="text" {...register("linkedin")} placeholder="LinkedIn" />
                <input type="text" {...register("observacoes")} placeholder="Observações" />

                <button type="submit">Cadastrar</button>
            </form>
        </main>
    );
};

export default CadastroClienteClient;