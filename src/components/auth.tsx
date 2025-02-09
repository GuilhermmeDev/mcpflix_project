"use client";

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import useAuth from "@/auth/checkAuth";

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
      provider: "google",
    });
  };

  return (
    <>
      <div className="flex flex-col flex-grow min-h-full justify-center items-center">
        <div className="bg-neutral-800 p-6 rounded-3xl">
          <form onSubmit={handler} className="flex flex-col gap-4 w-fit ">
            <div className="flex flex-col w-full items-center justify-center gap-3">
              <Image
                src={"/logo_mcpflix.svg"}
                width={120}
                height={100}
                alt="logo mcpflix"
              />
              <p className="text-medium text-xl text-center font-sans">
                {setName ? "Bem vindo!" : "Bem vindo de volta!"}
              </p>
              <p className="text-xs text-neutral-400 text-medium font-sans">
                {setName ? "Já possui uma conta?" : "Não tem uma conta?"}
                <Link
                  className="text-green-300 font-semibold"
                  href={setName ? "/login" : "/register"} // personaliza os textos dependendo da pagina pai (login ou registro)
                >
                  {setName ? " Faça Login" : " Registre-se"}
                </Link>
              </p>
            </div>
            {setName && (
              <input
                type="text"
                name="name"
                id="name"
                className="bg-neutral-900 focus:border-none focus:outline-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)} // compartilha o estado do input para a pagina pai
                required
              />
            )}
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)} // compartilha o estado do input para a pagina pai
              placeholder="Email"
              className="bg-neutral-900 focus:border-none focus:outline-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
              required
            />
            <input
              type="password"
              name="passw"
              id="passw"
              className="bg-neutral-900 focus:border-none focus:outline-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
              onChange={(e) => setPassw(e.target.value)} // compartilha o estado do input para a pagina pai
              placeholder="Senha"
              required
            />

            <p className="text-red-500 font-medium font-sans text-xs text-center">
              {error}
            </p>

            <div
              className={`w-full bg-green-400 flex justify-center items-center rounded-lg`}
            >
              <button
                type="submit"
                className="text-black font-medium w-fit p-2 font-sans text-sm"
              >
                Enviar
              </button>
            </div>
          </form>
          <hr className="my-4 border-neutral-600" />
          <div className="w-full flex justify-center items-center">
            <button
              className="w-fit bg-neutral-900 rounded-md py-2 px-12"
              onClick={handleGoogleAuth}
            >
              <i className="ri-google-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
