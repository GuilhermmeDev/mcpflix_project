import Link from "next/link";

export default function Page404({error} : {error : string}) {
  return (
    <div className="flex items-center justify-center h-screen gap-4 md:flex-row flex-col">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">{error}</p>
        <Link href="/dashboard">
            <button className="bg-green-400 text-black px-4 py-2 rounded-md text-sm">
            Voltar para a página inicial
            </button>
        </Link>
    </div>
  );
}