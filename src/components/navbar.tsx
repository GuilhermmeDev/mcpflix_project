'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface NavbarProps {
  onSearch: (value: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const router = useRouter();
  const InputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<string | null>(null);
  const handlerImageClick = () => {
    InputRef.current?.focus(); // garante que ao clicar na imagem da lupa, está clicando também no input
  };

  const [searchValue, setSearchValue] = useState('');
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
      router.push('/login');
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
    <div>
      <nav className="my-8 flex h-fit min-h-16 w-full flex-row items-center justify-between gap-4 px-4 md:ml-0 md:justify-center">
        {isTyping && (
          <div
            className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm" // modo de pesquisa com blur
            onClick={handlerInputExit}
          />
        )}

        {isTyping && ( // div que mostra o que esta sendo digitado
          <div className="fixed z-20 font-bold text-2xl text-white">
            {searchValue}
          </div>
        )}
        <div className="mr-4 flex h-12 w-full flex-row items-center justify-center rounded-3xl bg-card px-4 text-sm md:w-2/5">
          <input
            className="h-full w-full border-none bg-transparent focus:outline-none"
            id="search_input"
            name="search"
            onChange={handlerInputChanger}
            placeholder="Que filme você quer assistir?"
            ref={InputRef}
            type="text"
            value={searchValue}
          />

          <i className="ri-search-line text-lg" onClick={handlerImageClick} />
        </div>
        <div className="h-fit" onClick={() => setLogout(!isLogout)}>
          {user && (
            <Image
              alt="avatar"
              className="rounded-full"
              height={40}
              src={user}
              width={40}
            />
          )}
          {!user && (
            <i className="ri-user-line rounded-2xl bg-card p-4 text-lg" />
          )}
        </div>

        <div className={`${isLogout ? 'relative' : 'hidden'}`}>
          <button
            className={
              'flex items-center gap-2 rounded-lg bg-destructive p-2 text-foreground transition duration-300 ease-in-out hover:bg-red-500'
            }
            onClick={handleLogout}
            type="button"
          >
            <i className="ri-logout-box-r-line" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
