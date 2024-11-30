'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Props {
    
}

const Navbar: React.FC<Props> = ({  }) => {
    return (
        <nav className='hidden md:flex flex-col pt-2 gap-6 items-center text-slate-50 h-full bg-slate-800 md:w-1/4 lg:w-1/5'>
            <h1 className='text-2xl font-semibold'>Titulo</h1>

            <ul className='flex flex-col items-center'>
                <li><Link href={'/clientes'}>Clientes</Link></li>
                <li><Link href={'/cadastro-cliente'}>Cadastrar</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;  