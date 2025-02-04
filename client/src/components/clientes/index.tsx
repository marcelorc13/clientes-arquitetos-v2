'use client'

import "./clientes.css"
import { useEffect, useState } from 'react';
import { deleteCliente, getCliente, getClientes } from '@/services/clientes';
import { ClienteResponseType, FetchResponseType } from '@/models/response-model';
import { IoTrashOutline } from "react-icons/io5";
import Link from 'next/link';
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { downloadExcelFile } from "@/services/generate";
import { UseReload } from "@/hooks/useReload";

const Carregando = () => (
    <div>
        <ul className='lista py-4' >
            <li><AiOutlineLoading3Quarters className="animate-spin" /></li>
        </ul>
    </div>
)


const Clientes = () => {
    const [clientes, setClientes] = useState<ClienteResponseType[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [selecionado, setSelecionado] = useState<number[]>([])
    const [selecionarTodos, setSelecionarTodos] = useState<boolean>(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                const res: FetchResponseType<ClienteResponseType[] | null> | null | undefined = await getClientes()
                const data: ClienteResponseType[] | null | undefined = res?.data
                if (!res) {
                    return null
                }
                if (res.status == 200 && data) {
                    return setClientes(data);
                }
                if (res.status == 404) {
                    setLoading(false)
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                return setLoading(false);
            }
        };

        loadData()
    }, []);

    const handleDeleteCliente = async (id: number) => {
        const res: FetchResponseType<null> = await deleteCliente(id)
        if (res.status == 200) {
            console.log(res.message)
            UseReload()
            return toast.success(res.message)
        }
        if (res.status == 404) {
            console.log(res.message)
            return toast.error(res.message)
        }
    }

    const handleSelecionarTodos = () => {
        if (!selecionarTodos) {
            clientes?.map((cliente) => setSelecionado((prev) => [...prev, cliente.id_cliente]))
            return setSelecionarTodos(true)
        }
        setSelecionado([])
        return setSelecionarTodos(false)
    }

    const handleDownloadExcel = async () => {
        try {
            const clientesSelecionados = (await Promise.all(
                selecionado.map(async id => {
                    const clienteTemp = await getCliente(id.toString())
                    return clienteTemp?.data
                })
            )).filter((client): client is ClienteResponseType => client !== undefined)

            const res = await downloadExcelFile(clientesSelecionados)

            if (res) {
                return toast.success("Download iniciado com sucesso")
            }
            return toast.error('Erro ao fazer download')
        }
        catch (err) {
            console.log(err)
            return toast.error('Erro ao fazer download')
        }
    }

    return (
        <section className='w-full flex flex-col h-screen px-12 py-6'>
            <h1 className="text-2xl font-medium ">Clientes</h1>
            <h3 className="text-sm text-slate-600">Total: {clientes ? clientes.length : 0}</h3>
            {selecionado.length > 0 ?
                <div className="absolute top-8 right-12">
                    <div className="w-full flex flex-row gap-2">
                        <button className="bg-red-600 funcoes-selecionados" onClick={() => {
                            selecionado.map(async (id) => {
                                await deleteCliente(id)
                                setClientes(currentClientes => currentClientes ? currentClientes.filter(cliente => !selecionado.includes(cliente.id_cliente)) : null)
                            })
                        }}>Excluir</button>

                        <button className="bg-green-600 funcoes-selecionados" onClick={() => {
                            handleDownloadExcel()
                            setSelecionarTodos(false)
                            setSelecionado([])
                        }}>Download Excel</button>
                    </div>
                </div>
                : null
            }
            <ul className='lista text-slate-700'>
                <li className="col-span-1"><input className="cursor-pointer" type="checkbox" checked={selecionarTodos} onChange={() => handleSelecionarTodos()} /></li>
                <li className="col-span-1">ID</li>
                <li className="col-span-3">Nome</li>
                <li className="col-span-2">Telefone</li>
                <li className="col-span-2">Categoria</li>
                <li className="col-span-1">Excluir</li>
            </ul>
            <div className='overflow-y-auto bg-slate-200 w-full h-max flex flex-col shadow-md'>
                {!loading && clientes ? clientes.map((cliente, key) => (
                    <ul key={key} className={`listaData ${selecionado.includes(cliente.id_cliente) ? 'bg-blue-200' : ''}`}>
                        <li className="col-span-1"><input className="cursor-pointer" type="checkbox" checked={selecionado.includes(cliente.id_cliente)} onChange={() => {
                            setSelecionado((prev) => prev.includes(cliente.id_cliente) ?
                                prev.filter(id => id !== cliente.id_cliente) :
                                [...prev, cliente.id_cliente]
                            )
                        }} /></li>
                        <li className="col-span-8 group">
                            <Link href={`clientes/${cliente.id_cliente}`}>
                                <ul className="grid grid-cols-8">
                                    <li className='col-span-1'>{cliente.id_cliente}</li>
                                    <li className="col-span-3">{cliente.nome_completo}</li>
                                    <li className='col-span-2'>{cliente.telefone}</li>
                                    <li className="col-span-2">{cliente.categoria}</li>
                                </ul>
                            </Link>
                        </li>
                        <li className="col-span-1 justify-center self-center"><IoTrashOutline className="cursor-pointer" onClick={async () => await handleDeleteCliente(cliente.id_cliente)} /></li >
                    </ul>
                )) : !loading && !clientes ? <div className="flex flex-col gap-1 items-center justify-center py-2">
                    <h1>Ainda não existe clientes cadastrados no banco</h1>
                    <Link href={'/cadastro-cliente'} className="text-blue-500">Clique aqui para cadastrar o primeiro cliente</Link>
                </div>
                    : <Carregando />}
            </div>
        </section>
    )
}

const ClientesClient = () => {
    return (
        <main className='flex items-center justify-end w-full overflow-y-hidden bg-slate-300'>
            <section className='flex flex-col items-center w-full md:w-3/4 lg:w-4/5'>
                <Clientes />
            </section>
        </main>
    );
};

export default ClientesClient;