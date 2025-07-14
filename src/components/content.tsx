'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Movie from './movie';

interface ContentProps {
  searchValue: string; // valor que foi digitado pelo usuario na barra de pesquisa (navbar)
}

interface MovieModel {
  id: number;
  link_cover: string;
  title: string;
  release_year: number;
  category: { name: string };
}

interface Genre {
  id: number;
  name: string;
}

export default function Content({ searchValue }: ContentProps) {
  const [filmes, setFilmes] = useState<MovieModel[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Busca todos os filmes
      const { data: allFilmesData = [], error: filmesError } = await supabase
        .from('movies')
        .select('*, category:category_id(name)');

      if (filmesError) {
        return;
      }

      if (searchValue) {
        const filteredData = allFilmesData?.filter((filme) =>
          filme.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilmes(filteredData || []); // Armazena os filmes filtrados
      } else {
        setFilmes(allFilmesData || []); // Armazena todos os filmes se não houver busca
      }

      // Busca todos os gêneros
      const { data: genresData, error: genresError } = await supabase
        .from('category')
        .select('*');

      if (genresError) {
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
        {filmes.slice(0, 6).map(
          (
            filme // Exibe apenas os 8 primeiros filmes
          ) => (
            <li
              className="items-left flex min-w-48 flex-col justify-center gap-2 p-4"
              key={filme.id}
            >
              <Movie filme={filme} />
            </li>
          )
        )}
      </ul>

      {genres.map((genre, index) => {
        const filteredMovies = filmes.filter(
          (filme) =>
            filme.category?.name === genre.name &&
            !filmes.slice(0, 6).some((f) => f.id === filme.id) // Garante que não se repitam
        );
        return (
          filteredMovies.length > 0 && (
            <div key={genre.id || index}>
              <p className="mt-4 font-medium text-lg">{genre.name}</p>
              <ul className="flex flex-row overflow-x-auto">
                {filteredMovies.map((filme) => (
                  <li
                    className="items-left flex min-w-40 flex-col justify-center gap-2 p-4"
                    key={filme.id}
                  >
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
