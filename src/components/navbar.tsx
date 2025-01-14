"use client";

import React, { useRef, useState } from "react";

interface NavbarProps {
  onSearch: (value: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const InputRef = useRef<HTMLInputElement>(null);

  const handlerImageClick = () => {
    InputRef.current?.focus(); // garante que ao clicar na imagem da lupa, está clicando também no input
  };

  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false); // verifica um estado de digitação para exibição de um mode de pesquisa com blur

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

  return (
    <>
      <nav className="flex flex-row h-fit my-8 w-full px-4 justify-between gap-4 md:ml-0 md:justify-center min-h-16">
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
        <div className="mr-4 w-full justify-center md:w-2/5  bg-neutral-800 text-sm flex flex-row rounded-3xl px-4 items-center">
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
      </nav>
    </>
  );
}
