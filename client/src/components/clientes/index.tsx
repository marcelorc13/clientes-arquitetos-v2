'use client'

import "./clientes.css"
import { useEffect, useState } from 'react';
import { deleteCliente, getClientes } from '@/services/clientes';
import { ClienteResponseType, FetchResponseType } from '@/models/response-model';
import { IoTrashOutline } from "react-icons/io5";
import Link from 'next/link';
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Carregando = () => (
    <div>
        <ul className='lista py-4' >
            <li className="pequeno"><AiOutlineLoading3Quarters className="animate-spin" /></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li className="pequeno"></li>
        </ul>
    </div>
)


const Clientes = () => {
    const [clientes, setClientes] = useState<ClienteResponseType[] | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const res: FetchResponseType<ClienteResponseType[]> | null | undefined = await getClientes()
            const data: ClienteResponseType[] | null | undefined = res?.data
            if (!res) {
                return null
            }
            if (data) {
                setLoading(false);
                return setClientes(data);
            }
        };

        loadData()
    }, []);

    const handleDeleteCliente = async (id: number) => {
        const res: FetchResponseType<null> = await deleteCliente(id)
        if (res.status == 200) {
            console.log(res.message)
            return toast.success(res.message)
        }
        if (res.status == 404) {
            console.log(res.message)
            return toast.error(res.message)
        }
    }

    return (
        <section className='w-full flex flex-col h-screen px-12 py-6'>
            <h1 className="text-2xl font-medium">Clientes</h1>
            <ul className='lista text-slate-700'>
                <li className="pequeno"><input type="checkbox" /></li>
                <li>ID</li>
                <li>Nome</li>
                <li>Telefone</li>
                <li>Categoria</li>
                <li className="pequeno">Excluir</li>
            </ul>
            <div className='overflow-y-auto bg-slate-200 w-full h-max flex flex-col shadow-md '>
                {!loading && clientes ? clientes.map((cliente, key) => (
                    <ul key={key} className='border-slate-300 border-b py-4 grid grid-cols-10 px-2'>
                        <li className="col-span-1"><input type="checkbox"/></li>
                        <li className="col-span-8">
                            <Link href={`clientes/${cliente.id_cliente}`}>
                                <ul className="grid grid-cols-4">
                                    <li className=''>{cliente.id_cliente}</li>
                                    <li>{cliente.nome_completo}</li>
                                    <li className=''>{cliente.telefone}</li>
                                    <li>{cliente.categoria}</li>
                                </ul>
                            </Link>
                        </li>
                        <li className="col-span-1 justify-center self-center"><IoTrashOutline className="cursor-pointer" onClick={async () => await handleDeleteCliente(cliente.id_cliente)} /></li >
                    </ul>
                )) : <Carregando />}
            </div>
        </section>
    )
}

const ClientesClient: React.FC = ({ }) => {


    return (
        <main className='flex items-center justify-end w-full overflow-y-hidden bg-slate-300'>
            <section className='flex flex-col items-center w-full md:w-3/4 lg:w-4/5'>
                <Clientes />
            </section>
        </main>
    );
};

export default ClientesClient;