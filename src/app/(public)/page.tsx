'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import useAuth from '@/auth/checkAuth';
export default function Landing() {
  useAuth();
  return (
    <div className="mb-48 flex w-full flex-col items-center">
      <div className="m-8 flex w-5/6 flex-row items-center justify-between rounded-lg bg-card p-4">
        <Image
          alt="logo"
          className="h-8 md:h-auto"
          height={150}
          src="logo_mcpflix.svg"
          width={150}
        />
        <div className="flex flex-row items-center justify-between gap-4">
          <Link href="/login">
            <button
              className="rounded-xl border-2 border-border bg-secondary px-4 py-2 text-foreground text-sm"
              type="button"
            >
              Login
            </button>
          </Link>
          <Link href="/register">
            <button
              className="rounded-xl bg-primary p-2 text-secondary text-sm"
              type="button"
            >
              Registrar
            </button>
          </Link>
        </div>
      </div>
      <div className="m-8 flex w-full flex-col items-center justify-center rounded-lg p-4 text-justify">
        <TypeAnimation
          className="text-center font-medium text-5xl text-foreground"
          sequence={['Lugar onde o cinema da MCPF ganha vida.']}
          speed={1}
        />
        <p className="mt-4 text-center text-gray-400">
          Um projeto open-source que exibe gratuitamente as obras das turmas da
          Maria Célia Pinheiro Falcão
        </p>
        <Link href="/login">
          <button
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-secondary text-sm"
            type="button"
          >
            Comece agora
          </button>
        </Link>
      </div>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="my-16 flex w-full flex-row items-center justify-center gap-8 px-8">
          <div className="hidden rounded-xl bg-neutral-800 p-4 md:block">
            <Image
              alt="logo"
              className="hidden rounded-xl md:block"
              height={1000}
              src="dashboard_photo.svg"
              width={1000}
            />
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center gap-12 pr-4 text-center">
            <div>
              <h1 className="font-medium text-5xl text-white">UI/UX</h1>
              <p className="mt-4 text-center text-gray-400">
                Interface limpa e intuitiva
              </p>
              <p className="text-center text-gray-400">Responsiva com mobile</p>
            </div>
            <div>
              <h1 className="font-medium text-4xl text-white">Conteúdo</h1>
              <p className="mt-4 text-center text-gray-400">
                Desfrute de inúmeros filmes feitos pelos alunos da MCPF
                gratuitamente
              </p>
            </div>
            <div>
              <h1 className="font-medium text-4xl text-white">Centralizado</h1>
              <p className="mt-4 text-center text-gray-400">
                Filmes reunidos em só um lugar para você
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <hr className="w-5/6 border-border" />

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 5 }}
      >
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-12 pr-4 text-center">
          <h1 className="font-medium text-5xl text-foreground">Features</h1>
          <div className="flex w-5/6 flex-row items-center justify-between gap-4">
            <div className="w-1/4">
              <h1 className="font-medium text-foreground text-xl md:text-3xl">
                Favoritos
              </h1>
              <p className="mt-4 text-center text-gray-400 text-sm md:text-base">
                Você pode marcar seus filmes como favoritos para ficar mais
                fácil de encontrá-los
              </p>
            </div>

            <div className="w-1/4">
              <h1 className="font-medium text-foreground text-xl md:text-3xl">
                Qualidade
              </h1>
              <p className="mt-4 text-center text-gray-400 text-sm md:text-base">
                No MCPFlix, você pode contar com uma ótima qualidade de imagem e
                som dos filmes
              </p>
            </div>

            <div className="w-1/4">
              <h1 className="font-medium text-foreground text-xl md:text-3xl">
                Pesquisa
              </h1>
              <p className="mt-4 text-center text-gray-400 text-sm md:text-base">
                Pesquisa rápida por gênero ou pelo nome do filme
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
