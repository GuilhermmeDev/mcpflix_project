"use client";

import GenrerOption from "./genrer";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

interface ContentProps {
  searchValue: string; // valor que foi digitado pelo usuario na barra de pesquisa (navbar)
}

export default function Content({ searchValue }: ContentProps) {
  const [filmes, setFilmes] = useState<any[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmes = async () => {
      const query = supabase
        .from("movies")
        .select("*, category:category_id(name)"); // seleciona todos os filmes, pegando também os nomes de associados a chave estrangeira dos generos

      if (selectedGenre !== null) {
        query.eq("category_id", selectedGenre); // se há algum genero selecionado, filtrar filmes pelo genero escolhido
      }

      if (searchValue.length > 0) {
        // se existir algum caractere no input de pesquisa, filtra os filmes
        query.ilike("title", `%${searchValue}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setFilmes(data);
      }
    };
    fetchFilmes();
  }, [selectedGenre, searchValue]); // qualquer mudança em um desses estados, refazer as funções dentro useEffects

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  return (
    <article className="ml-4 md:ml-0">
      <p className="font-medium text-lg">Recentes</p>
      <GenrerOption onSelectGenre={handleGenreSelect} />
      <ul className="flex flex-row overflow-x-auto">
        {filmes.map(
          (
            filme // mostra cada filme encontrado na requisição ao BD
          ) => (
            <li
              key={filme.id}
              className="bg-neutral-800 rounded-2xl flex flex-col items-left justify-center p-4 mr-8 gap-2 min-w-40"
            >
              <Link href={`/movie/${filme.id}`} passHref>
                <img
                  src={filme.link_cover}
                  alt="logo_mcpflix"
                  width={150}
                  className="rounded-2xl py-1 h-56"
                />
                <p className="bg-neutral-700 p-2 rounded-3xl text-xs w-fit">
                  {filme.category?.name}
                </p>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-base font-medium">{filme.title}</p>
                    <p className="text-xs">{filme.release_year}</p>
                  </div>
                  <i className="ri-play-fill text-black bg-white rounded-full py-2 px-3"></i>
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
    </article>
  );
}
