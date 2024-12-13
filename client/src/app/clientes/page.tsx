import '../paginasNav.css'
import ClientesClient from "@/components/clientes";
import Navbar from "@/components/navbar";

const ClientesPage = () => {
    return (
        <>
            <Navbar />
            <ClientesClient />
        </>
    );
};

export default ClientesPage;