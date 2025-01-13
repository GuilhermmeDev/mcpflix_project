"use client";

import GenrerOption from "./genrer";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Content() {
  const [filmes, setFilmes] = useState<any[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmes = async () => {
      const query = supabase.from("movies").select("*");

      if (selectedGenre !== null) {
        query.eq("category_id", selectedGenre);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setFilmes(data);
      }
    };
    fetchFilmes();
  }, [selectedGenre]);

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  return (
    <article className="ml-4 md:ml-0">
      <p className="font-medium text-lg">Recentes</p>
      <GenrerOption onSelectGenre={handleGenreSelect} />
      <ul className="flex flex-row">
        {filmes.map((filme) => (
          <li
            key={filme.id}
            className="bg-neutral-800 rounded-2xl flex flex-col items-center justify-center p-4 mr-8"
          >
            <img
              src={filme.link_cover}
              alt="logo_mcpflix"
              width={150}
              className="rounded-2xl py-1"
            />
            <p className="text-base font-medium">{filme.title}</p>
            <p className="text-xs">{filme.release_year}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
