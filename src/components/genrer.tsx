"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function GenrerOption({
  onSelectGenre,
}: {
  onSelectGenre: (genre: number | null) => void; // estado que é compartilhado pela pagina pai
}) {
  const [genrer, setGenrer] = useState<string[]>([]);
  const [selectedGenrer, setSelectedGenrer] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenrers = async () => {
      // requisição que retorna todos os generos de filmes do BD
      const { data, error } = await supabase.from("category").select("*");

      if (error) {
        console.error(error);
      } else {
        setGenrer(data);
      }
    };
    fetchGenrers();
  }, []);

  const handleButtonClick = (genrer: { name: string; id: number }) => {
    const newSelectedGenrer =
      selectedGenrer === genrer.name ? null : genrer.name;
    if (newSelectedGenrer === null) {
      onSelectGenre(null);
    } else {
      onSelectGenre(genrer.id); // id do genero selecionado será passado para a pagina pai para o filtro de filmes por genero
    }
    setSelectedGenrer(newSelectedGenrer);
  };

  return (
    // mostra todos os generos que estão cadastrados no BD dinamicamente
    <>
      {genrer.map((genrer) => (
        <button
          key={genrer.id}
          className={`bg-neutral-800 rounded-full px-4 py-2 text-sm mr-6 my-4 ${
            selectedGenrer === genrer.name ? "text-green-300" : "text-white"
          }`}
          onClick={() => handleButtonClick(genrer)}
        >
          {genrer.name}
        </button>
      ))}
    </>
  );
}
