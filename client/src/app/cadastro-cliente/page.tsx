import '../paginasNav.css'
import Navbar from '@/components/navbar';
import CadastroClienteClient from "@/components/cadastro-cliente";

const CadastroCliente = () => {
    return (
        <>
            <Navbar />
            <CadastroClienteClient />
        </>
    );
};

export default CadastroCliente;