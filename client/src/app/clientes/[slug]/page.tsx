import ClienteSelecionadoClient from "@/components/cliente";
import Navbar from "@/components/navbar"
import '../../paginasNav.css'

const ClienteSelecionadoPage = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    return (
        <>
            <Navbar />
            <ClienteSelecionadoClient id={params.slug} />
        </>
    );
};

export default ClienteSelecionadoPage;