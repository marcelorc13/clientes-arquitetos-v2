import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href={'/clientes'}>Clientes</Link><br/>
      <Link href={'/cadastro-cliente'}>Cadastrar</Link>
    </main>
  );
}
