"use client"
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import useAuth from "@/auth/checkAuth";
export default function Landing() {
    useAuth();
    return (
        <div className="flex flex-col items-center w-full mb-48">
            <div className="flex flex-row items-center justify-between w-5/6 bg-neutral-800 m-8 p-4 rounded-lg">
                <Image src="logo_mcpflix.svg" alt="logo" width={150} height={150} className="md:h-auto h-8" />
                <div className="flex flex-row items-center justify-between gap-4">
                    <Link href="/login">
                        <button className="bg-neutral-700 text-white px-4 py-2 rounded-xl text-sm border-2 border-neutral-600">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="bg-green-400 text-black px-4 py-2 rounded-xl text-sm md:text-base">
                            Registrar
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center m-8 p-4 rounded-lg text-justify w-full">
                <TypeAnimation
                    sequence={[
                        "Lugar onde o cinema da MCPF ganha vida.",
                    ]}
                    speed={1}
                    className="text-5xl font-medium text-white text-center"
                />
                <p className="text-gray-400 text-center mt-4">Um projeto open-source que exibe gratuitamente as obras das turmas da Maria Célia Pinheiro Falcão</p>
                <Link href="/login">
                    <button className="bg-green-400 text-black px-4 py-2 rounded-xl text-sm mt-4">
                        Comece agora
                    </button>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <div className="flex flex-row items-center justify-center w-full my-16 px-8 gap-8">
                    <div className="bg-neutral-800 rounded-xl p-4 md:block hidden">
                        <Image src="dashboard_photo.svg" alt="logo" width={1000} height={1000} className="rounded-xl md:block hidden"/>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/4 gap-12 text-center pr-4">
                        <div>
                            <h1 className="text-5xl font-medium text-white">UI/UX</h1>
                            <p className="text-gray-400 text-center mt-4">Interface limpa e intuitiva</p>
                            <p className="text-gray-400 text-center">Responsiva com mobile</p>
                        </div>
                        <div>
                            <h1 className="text-4xl font-medium text-white">Conteúdo</h1>
                            <p className="text-gray-400 text-center mt-4">Desfrute de inúmeros filmes feitos pelos alunos da MCPF gratuitamente</p>
                        </div>
                        <div>
                            <h1 className="text-4xl font-medium text-white">Centralizado</h1>
                            <p className="text-gray-400 text-center mt-4">Filmes reunidos em só um lugar para você</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <hr className="w-5/6 border-neutral-700" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
            >
                <div className="flex flex-col items-center justify-between w-full gap-12 text-center pr-4 mt-16">
                    <h1 className="text-5xl font-medium text-white">Features</h1>
                    <div className="flex flex-row items-center justify-between gap-4 w-5/6">
                        <div className="w-1/4">
                            <h1 className="md:text-3xl text-xl font-medium text-white">Favoritos</h1>
                            <p className="text-gray-400 text-center mt-4 md:text-base text-sm">Você pode marcar seus filmes como favoritos para ficar mais fácil de encontrá-los</p>
                        </div>

                        <div className="w-1/4">
                            <h1 className="md:text-3xl text-xl font-medium text-white">Qualidade</h1>
                            <p className="text-gray-400 text-center mt-4 md:text-base text-sm">No MCPFlix, você pode contar com uma ótima qualidade de imagem e som dos filmes</p>
                        </div>

                        <div className="w-1/4">
                            <h1 className="md:text-3xl text-xl font-medium text-white">Pesquisa</h1>
                            <p className="text-gray-400 text-center mt-4 md:text-base text-sm">Pesquisa rápida por gênero ou pelo nome do filme</p>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}