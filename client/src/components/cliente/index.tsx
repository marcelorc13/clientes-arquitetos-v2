'use client'

import './cliente.css'
import { ClienteResponseType, FetchResponseType } from '@/models/response-model';
import { getCliente } from '@/services/clientes';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoArrowLeft } from 'react-icons/go';

interface Props {
    id: string
}

const ClienteSelecionadoClient: React.FC<Props> = ({ id }) => {
    const [cliente, setCliente] = useState<ClienteResponseType>();
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
            const res: FetchResponseType<ClienteResponseType> | null | undefined = await getCliente(id);
            const data: ClienteResponseType | null | undefined = res?.data
            if (!res) {
                setLoading(false)
                return null
            }
            if (data) {
                setLoading(false);
                return setCliente(data);
            }
        };
        loadData()
    }, []);

    return (
        <main className='flex items-center justify-end w-full bg-slate-300'>
            <section className='w-full md:w-3/4 lg:w-4/5 relative h-screen px-12 py-6'>
                {!loading && cliente ?
                    <div className='flex flex-col gap-2 w-full'>
                        <span className='absolute top-4 left-4 cursor-pointer' onClick={() => router.push('/clientes')}><GoArrowLeft /></span>

                        <h1 className='text-2xl font-semibold ps-2'>{cliente.nome_completo.split(' ')[0]}</h1>

                        <div className='infos flex flex-col gap-2 text-lg bg-slate-200 px-8 py-4 shadow-lg'>
                            <div>
                                <div><span>Nome Completo: </span> {cliente.nome_completo}</div>
                                <div><span>Telefone: </span> {cliente.telefone}</div>
                            </div>
                            <div>
                                <div><span>Categoria: </span> {cliente.categoria}</div>
                                <div><span>Empresa: </span> {cliente.empresa ? cliente.empresa : "N/A"}</div>
                            </div>
                            <div>
                                <div><span>Email: </span> {cliente.email ? cliente.email : "N/A"}</div>
                                <div><span>Instagram: </span> {cliente.instagram ? cliente.instagram : "N/A"}</div>
                            </div>
                            <div>
                                <div><span>CPF: </span> {cliente.cpf ? cliente.cpf : "N/A"}</div>
                                <div><span>CNPJ: </span> {cliente.cnpj ? cliente.cnpj : "N/A"}</div>
                            </div>
                            <div>
                                <div><span>Site: </span> {cliente.site ? cliente.site : "N/A"}</div>
                                <div><span>Endereço: </span> {cliente.endereco ? cliente.endereco : "N/A"}</div>
                            </div>
                            <div>
                                <div><span>Aniversário: </span> {cliente.aniversario ? new Date(cliente.aniversario).toLocaleDateString() : 'N/A'}</div>
                                <div><span>Linkedin: </span> {cliente.linkedin ? cliente.linkedin : "N/A"}</div>
                            </div>
                            <div>
                                <div><span>Observações: </span> {cliente.observacoes ? cliente.observacoes : "N/A"}</div>
                                <div><span>Cadastrado em: </span> {cliente.data_de_cadastro ? new Date(cliente.data_de_cadastro).toLocaleDateString() : 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex justify-center items-center h-screen text-2xl'><AiOutlineLoading3Quarters className='animate-spin' /></div>
                }
            </section>
        </main>
    );
};

export default ClienteSelecionadoClient;