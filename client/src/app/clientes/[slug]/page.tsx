import ClienteSelecionadoClient from "@/components/cliente";
import Navbar from "@/components/navbar"
import '../../paginasNav.css'

const ClienteSelecionadoPage = ({ params }: { params: { slug: string } }) => {
    return (
        <>
            <Navbar />
            <ClienteSelecionadoClient id={params.slug} />
        </>
    );
};

export default ClienteSelecionadoPage;