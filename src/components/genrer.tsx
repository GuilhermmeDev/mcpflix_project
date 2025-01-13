"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function GenrerOption({
  onSelectGenre,
}: {
  onSelectGenre: (genre: string | null) => void;
}) {
  const [genrer, setGenrer] = useState<string[]>([]);
  const [selectedGenrer, setSelectedGenrer] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenrers = async () => {
      const { data, error } = await supabase.from("category").select("*");

      if (error) {
        console.error(error);
      } else {
        setGenrer(data);
      }
    };
    fetchGenrers();
  }, []);

  const handleButtonClick = (genrer: string) => {
    const newSelectedGenrer =
      selectedGenrer === genrer.name ? null : genrer.name;
    if (newSelectedGenrer === null) {
      onSelectGenre(null);
    } else {
      onSelectGenre(genrer.id);
    }
    setSelectedGenrer(newSelectedGenrer);
  };

  return (
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
