import Link from 'next/link';

export default function Page404({ error }: { error: string }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 md:flex-row">
      <h1 className="font-bold text-4xl">404</h1>
      <p className="text-xl">{error}</p>
      <Link href="/dashboard">
        <button
          className="rounded-md bg-green-400 px-4 py-2 text-black text-sm"
          type="button"
        >
          Voltar para a página inicial
        </button>
      </Link>
    </div>
  );
}
