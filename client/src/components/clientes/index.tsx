'use client'

import "./clientes.css"
import { useEffect, useState } from 'react';
import { deleteCliente, getClientes } from '@/services/clientes';
import { ClienteResponseType, FetchResponseType } from '@/models/response-model';
import { IoTrashOutline } from "react-icons/io5";
import { Router } from "next/router";
import Link from 'next/link';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Carregando = () => (
    <div className='w-full'>
        <ul className='lista grid grid-cols-8 border-gray-300 border-l border-r border-b' >
            <li className='bg-gray-200 animate-pulse id'></li>
            <li className='select-none text-slate-50'>.</li>
            <li className='bg-gray-200 animate-pulse'></li>
            <li></li>
            <li></li>
        </ul>
    </div>
)


const Clientes = () => {
    const [clientes, setClientes] = useState<ClienteResponseType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
            const res: FetchResponseType<ClienteResponseType[]> | null | undefined = await getClientes();
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

    return (
        <section className='w-full px-4'>
            <ul className='cabecalho-lista grid grid-cols-8 text-lg font-medium border-gray-300 border-b'>
                <li className="id">ID:</li>
                <li>Nome:</li>
                <li>Telefone:</li>
                <li>Categoria:</li>
                <li></li>
            </ul>
            <div className='relative'>
                {!loading && clientes ? clientes.map((cliente, key) => (
                    <ul key={key} className='lista grid grid-cols-8 border-gray-300 border-l border-r border-b'>
                        <li className='bg-gray-200 id'><Link href={`clientes/${cliente.id_cliente}`}>{cliente.id_cliente}</Link></li>
                        <li><Link href={`clientes/${cliente.id_cliente}`}>{cliente.nome_completo}</Link></li>
                        <li className='bg-gray-200'>{cliente.telefone}</li>
                        <li>{cliente.categoria}</li>
                        <li className="id flex items-center justify-end" ><IoTrashOutline className="cursor-pointer" onClick={async (e) => {
                            e.preventDefault()
                            const res: FetchResponseType<any> = await deleteCliente(cliente.id_cliente)
                            if (res.status == 200) {
                                console.log(res.message)
                                return toast.success(res.message)
                            }
                            if (res.status == 404) {
                                console.log(res.message)
                                return toast.error(res.message)
                            }
                        }
                        } /></li >
                    </ul>
                )) : <Carregando />}
            </div>
        </section>
    )
}

const ClientesClient: React.FC = ({ }) => {


    return (
        <main className='flex items-center justify-end w-full'>
            <section className='flex flex-col items-center w-full md:w-3/4 lg:w-4/5'>
                <h1 className='text-2xl font-semibold'>Clientes:</h1>
                <Clientes />
            </section>
        </main>
    );
};

export default ClientesClient;