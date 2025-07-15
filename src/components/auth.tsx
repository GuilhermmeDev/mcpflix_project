'use client';

import Image from 'next/image';
import Link from 'next/link';
import useAuth from '@/auth/checkAuth';
import { supabase } from '@/lib/supabaseClient';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AuthProps {
  handler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setEmail: (value: string) => void;
  setPassw: (value: string) => void;
  setName?: (value: string) => void;
  error?: string;
} // props de passagem de estados entre telas de registro e login

export default function Auth({
  handler,
  setEmail,
  setPassw,
  setName,
  error,
}: AuthProps) {
  useAuth();

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-grow flex-col items-center justify-center">
        <div className="w-1/4 rounded-3xl border border-border bg-background p-6">
          <form className="flex w-full flex-col gap-4 " onSubmit={handler}>
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <Image
                alt="logo mcpflix"
                height={100}
                src={'/logo_mcpflix.svg'}
                width={120}
              />
              <p className="text-center font-sans text-medium text-xl">
                {setName ? 'Bem vindo!' : 'Bem vindo de volta!'}
              </p>
              <p className="font-sans text-medium text-primary text-xs">
                {setName ? 'Já possui uma conta?' : 'Não tem uma conta?'}
                <Link
                  className="font-semibold text-primary"
                  href={setName ? '/login' : '/register'} // personaliza os textos dependendo da pagina pai (login ou registro)
                >
                  {setName ? ' Faça Login' : ' Registre-se'}
                </Link>
              </p>
            </div>
            {setName && (
              <Input
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required // compartilha o estado do input para a pagina pai
                type="text"
              />
            )}
            <Input
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)} // compartilha o estado do input para a pagina pai
              placeholder="Email"
              required
              type="email"
            />
            <Input
              id="passw"
              name="passw"
              onChange={(e) => setPassw(e.target.value)}
              placeholder="Senha" // compartilha o estado do input para a pagina pai
              required
              type="password"
            />

            <p className="text-center font-medium font-sans text-red-500 text-xs">
              {error}
            </p>

            <Button
              className="w-full p-2 font-medium font-sans text-background text-sm"
              type="submit"
            >
              Enviar
            </Button>
          </form>
          <hr className="my-4 border-neutral-600" />
          <div className="flex w-full items-center justify-center">
            <Button
              className="w-fit rounded-md px-12 py-2"
              onClick={handleGoogleAuth}
              type="button"
              variant={'secondary'}
            >
              <i className="ri-google-fill" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
