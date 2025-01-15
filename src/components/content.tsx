"use client";

import GenrerOption from "./genrer";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Movie from "./movie";

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
              <Movie filme={filme} />
            </li>
          )
        )}
      </ul>
    </article>
  );
}
