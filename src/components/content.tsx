"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Movie from "./movie";

interface ContentProps {
  searchValue: string; // valor que foi digitado pelo usuario na barra de pesquisa (navbar)
}

export default function Content({ searchValue }: ContentProps) {
  const [filmes, setFilmes] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Busca os filmes e os gêneros
      const { data: filmesData, error: filmesError } = await supabase
        .from("movies")
        .select("*, category:category_id(name)");

      if (filmesError) {
        console.error(filmesError);
        return;
      }

      setFilmes(filmesData);

      // Busca todos os gêneros
      const { data: genresData, error: genresError } = await supabase
        .from("category")
        .select("*");

      if (genresError) {
        console.error(genresError);
        return;
      }

      setGenres(genresData); // Armazena os gêneros
    };

    fetchData();
  }, [searchValue]);


  return (
    <article className="ml-4 md:ml-0">
      <p className="font-medium text-lg">Talvez você goste</p>
      <ul className="flex flex-row overflow-x-auto">
        {filmes.map(filme => (
          <li key={filme.id} className="flex flex-col items-left justify-center p-4 gap-2 min-w-48">
            <Movie filme={filme} />
          </li>
        ))}
      </ul>

      {genres.map((genre, index) => {
        const filteredMovies = filmes.filter(filme => filme.category?.name === genre.name);
        return (
          filteredMovies.length > 0 && (
            <div key={genre.id || index}>
              <p className="font-medium text-lg mt-4">{genre.name}</p>
              <ul className="flex flex-row overflow-x-auto">
                {filteredMovies.map(filme => (
                  <li key={filme.id} className="flex flex-col items-left justify-center p-4 gap-2 min-w-40">
                    <Movie filme={filme} />
                  </li>
                ))}
              </ul>
            </div>
          )
        );
      })}
    </article>
  );
}
