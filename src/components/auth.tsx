"use client";

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthProps {
  handler: any;
  setEmail: (value: string) => void;
  setPassw: (value: string) => void;
  setName?: (value: string) => void;
  error?: string;
  success?: boolean;
} // props de passagem de estados entre telas de registro e login

export default function Auth({
  handler,
  setEmail,
  setPassw,
  setName,
  error,
  success,
}: AuthProps) {
  const router = useRouter(); // até a linha 39 garante que um usuario logado não acesse as telas de login e registro

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.push("/");
      }
    };
    checkAuth();
  });

  return (
    <>
      {success && ( // caixa de alerta para avisar que um email foi enviado caso seja um novo usuario registrado
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <i className="ri-information-line text-2xl mr-4"></i>
            </div>
            <div>
              <p className="font-bold">
                Enviamos um email de confirmação para você
              </p>
              <p className="text-sm">
                Confira seu inbox e confirme sua conta clicando no link enviado.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full h-full justify-center items-center">
        <form
          onSubmit={handler}
          className="flex flex-col gap-4 w-fit bg-neutral-800 p-6 rounded-3xl"
        >
          <div className="flex flex-col w-full items-center justify-center">
            <Image
              src={"/mcpflix_logo.svg"}
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
                className="text-green-300"
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
              className="bg-neutral-500 focus:border-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
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
            className="bg-neutral-500 focus:border-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
            required
          />
          <input
            type="password"
            name="passw"
            id="passw"
            className="bg-neutral-500 focus:border-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
            onChange={(e) => setPassw(e.target.value)} // compartilha o estado do input para a pagina pai
            placeholder="Senha"
            required
          />

          <p className="text-red-500 font-medium font-sans text-xs text-center">
            {error}
          </p>

          <div
            className={`w-full ${
              success ? "bg-gray-400" : "bg-green-400"
            } flex justify-center items-center rounded-xl`}
          >
            <button
              type="submit"
              className="text-black font-medium w-fit p-2 font-sans text-sm"
              disabled={success} // desabilita o botão em caso de sucesso na criação do usuario
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
