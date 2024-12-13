'use client'

import { useEffect, useState } from 'react';
import { getClientes } from '@/services/clientes';
import { ClienteResponseType, FetchResponseType } from '@/models/response-model';

const Carregando = () => (
    <div className='w-full'>
        <ul className='grid grid-cols-4 border-gray-300 border-b' >
            <li className='bg-gray-200 animate-pulse '></li>
            <li className='select-none text-slate-50'>s</li>
            <li className='bg-gray-200 animate-pulse'></li>
            <li></li>
        </ul>
    </div>
)


const Clientes = () => {
    const [clientes, setClientes] = useState<ClienteResponseType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const res: FetchResponseType | null | undefined = await getClientes();
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
            <ul className='grid grid-cols-4 text-lg font-medium border-gray-300 border-b'>
                <li>ID:</li>
                <li>Nome:</li>
                <li>Telefone:</li>
                <li>Categoria:</li>
            </ul>
            {!loading && clientes ? clientes.map((cliente, key) => (
                <ul className='grid grid-cols-4 border-gray-300 border-b' key={key}>
                    <li className='bg-gray-200'>{cliente.id_cliente}</li>
                    <li>{cliente.nome_completo}</li>
                    <li className='bg-gray-200'>{cliente.telefone}</li>
                    <li>{cliente.categoria}</li>
                </ul>
            )) : <Carregando />}
        </section>
    )
}

const ClientesClient: React.FC = ({ }) => {


    return (
        <main className='flex items-center justify-end w-full'>
            <section className='flex flex-col items-center bg-slate-50 w-full md:w-3/4 lg:w-4/5'>
                <h1 className='text-2xl font-semibold'>Clientes:</h1>
                <Clientes />
            </section>
        </main>
    );
};

export default ClientesClient;