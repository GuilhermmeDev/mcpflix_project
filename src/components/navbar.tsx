"use client";


import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
interface NavbarProps {
  onSearch: (value: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const router = useRouter();
  const InputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const handlerImageClick = () => {
    InputRef.current?.focus(); // garante que ao clicar na imagem da lupa, está clicando também no input
  };

  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false); // verifica um estado de digitação para exibição de um mode de pesquisa com blur

  const [isLogout, setLogout] = useState<boolean>(false); // verifica se a caixa de logout foi clicado

  const handlerInputChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
    setTimeout(() => {
      onSearch(e.target.value); // estado que é compartilhado com pagina pai (content) que possui o handler de filtro de pesquisa
    }, 500); // debounce para evitar sobrecarga de requisições no BD
  };

  const handlerInputExit = () => {
    setIsTyping(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    handleGetUserAvatar();
  }, []);
  const handleGetUserAvatar = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
    } else {
      console.log(data.user.user_metadata.avatar_url);
      setUser(data.user.user_metadata.avatar_url);
    }
  };

  return (
    <>
      <nav className="flex flex-row h-fit my-8 w-full px-4 justify-between gap-4 md:ml-0 md:justify-center min-h-16 items-center">
        {isTyping && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10" // modo de pesquisa com blur
            onClick={handlerInputExit}
          ></div>
        )}

        {isTyping && ( // div que mostra o que esta sendo digitado
          <div className="fixed z-20 text-white text-2xl font-bold">
            {searchValue}
          </div>
        )}
        <div className="mr-4 w-full justify-center md:w-2/5  bg-neutral-800 text-sm flex flex-row rounded-3xl px-4 items-center h-12">
          <input
            type="text"
            name="search"
            id="search_input"
            placeholder="Que filme você quer assistir?"
            className="w-full h-full bg-transparent focus:outline-none border-none"
            ref={InputRef}
            value={searchValue}
            onChange={handlerInputChanger}
          />

          <i className="ri-search-line text-lg" onClick={handlerImageClick}></i>
        </div>
        <div
          className="h-fit"
          onClick={() => setLogout(!isLogout)}
        >
          {user && (<Image src={user} alt="avatar" width={40} height={40} className="rounded-full" />)}
          {!user && (<i className="p-4 bg-neutral-800 rounded-2xl ri-user-line text-lg" />)}
        </div>
        
        <div className={`${isLogout ? "relative" : "hidden"}`}>
          <button
            className={`flex items-center gap-2 bg-red-600 hover:bg-red-500 transition duration-300 ease-in-out rounded-lg p-2 text-white`}
            onClick={handleLogout}
          >
            <i className="ri-logout-box-r-line" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}
