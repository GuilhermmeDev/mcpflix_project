"use client";
import { supabase } from "@/lib/supabaseClient";
import React from "react";
import { useEffect, useState } from "react";
import VideoPlayer from "./videoPlayer";
import MovieInfo from "@/components/movieInfo";
import TopBar from "@/components/topBar";
import Fav from "./fav";
import CheckAuth from "@/auth/checkAuth";
interface Props {
  params: { id: string };
}

export default function pageMovie({ params }: Props) {
  CheckAuth();

  const [movie, setMovie] = useState<any | null>(null);

  const { id } = React.use(params); // resgata o id do filme que está na URL (movie/id)

  useEffect(() => {
    const fetchMovie = async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*, category:category_id(name)")
        .eq("id", id)
        .single(); // retorna APENAS um filme que foi encontrado com tais condições

      if (error) {
        console.error(error);
      } else {
        setMovie(data ? data : null);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>carregando filme</p>; // mensagem que aparece enquanto se espera a requisição
  }

  return (
    <>
      <TopBar movieTitle={movie.title} />
      <VideoPlayer />
      <div className="mt-6 flex flex-col gap-6 mx-8">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-3xl">{movie.title}</p>
          <Fav movieId={movie.id} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-2xl">Descrição</p>
          <p >{movie.synopsis}</p>
        </div>
        <div className="w-full md:w-1/4 grid grid-cols-3">
          <MovieInfo label="Duração" movieContent={movie.duration} />
          <MovieInfo
            label="Data de Lançamento"
            movieContent={movie.release_year}
          />
          <MovieInfo label="Genero" movieContent={movie.category.name} />
        </div>
      </div>
    </>
  );
}
