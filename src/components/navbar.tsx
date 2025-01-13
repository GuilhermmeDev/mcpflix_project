"use client";

import React, { useRef, useState } from "react";

export default function Navbar() {
  const InputRef = useRef<HTMLInputElement>(null);

  const handlerImageClick = () => {
    InputRef.current?.focus();
  };

  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handlerInputChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handlerInputExit = () => {
    setIsTyping(false);
  };

  return (
    <>
      <nav className="flex flex-row h-fit my-8 w-full px-4 justify-between gap-4 md:ml-0 md:justify-center min-h-16">
        {isTyping && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
            onClick={handlerInputExit}
          ></div>
        )}

        {isTyping && (
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
