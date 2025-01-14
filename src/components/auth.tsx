"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthProps {
  handler: any;
  setEmail: (value: string) => void;
  setPassw: (value: string) => void;
  setName?: (value: string) => void;
}

export default function Auth({
  handler,
  setEmail,
  setPassw,
  setName,
}: AuthProps) {
  return (
    <>
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
                href={setName ? "/login" : "/register"}
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
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-neutral-500 focus:border-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
            required
          />
          <input
            type="password"
            name="passw"
            id="passw"
            className="bg-neutral-500 focus:border-none text-white rounded-xl p-2 placeholder:font-sans text-sm placeholder:text-neutral-300"
            onChange={(e) => setPassw(e.target.value)}
            placeholder="Senha"
            required
          />
          <div className="w-full bg-green-400 flex justify-center items-center rounded-xl">
            <button
              type="submit"
              className="text-black font-medium w-fit p-2 font-sans text-sm"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
