'use client'

import Link from 'next/link';

interface Props {

}

const Navbar: React.FC<Props> = ({ }) => {
    return (
        <nav className='fixed hidden md:flex ps-1 py-1 h-screen  md:w-1/4 lg:w-1/5'>
            <div className='w-full flex flex-col pt-2 gap-6 items-center text-slate-50 bg-slate-800 rounded-xl'>
                <h1 className='text-2xl font-semibold'>Título</h1>
                <ul className='flex flex-col items-center'>
                    <li><Link href={'/clientes'}>Clientes</Link></li>
                    <li><Link href={'/cadastro-cliente'}>Cadastrar</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;  