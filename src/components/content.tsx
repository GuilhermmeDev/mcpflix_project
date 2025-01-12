"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

export default function Content() {
  const [filmes, setFilmes] = useState<any[]>([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      const { data, error } = await supabase.from("movies").select("*");

      if (error) {
        console.error(error);
      } else {
        setFilmes(data);
      }
    };
    fetchFilmes();
  });

  return (
    <article className="ml-4 md:ml-0">
      <p className="font-medium text-lg">Recentes</p>

      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            {filme.title} <br /> {filme.synopsis}
            <img
              src={filme.link_cover}
              alt="logo_mcpflix"
              width={100}
              height={50}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
