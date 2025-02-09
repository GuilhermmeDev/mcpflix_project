"use client";
import { supabase } from "@/lib/supabaseClient";
import React from "react";
import { useEffect, useState } from "react";
import VideoPlayer from "./videoPlayer";
import MovieInfo from "@/components/movieInfo";
import TopBar from "@/components/topBar";
import Fav from "./fav";
import useAuth from "@/auth/checkAuth";
import Page404 from "@/components/404";

interface Movie {
  id: number;
  title: string;
  release_year: number;
  duration: number;
  synopsis: string;
  link_drive: string;
  category: { name: string };
}

interface Props {
  params: { id: number };
}

export default function PageMovie({ params }: Props) {
  useAuth();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        setErrorMessage("Filme não encontrado");
      } else {
        setMovie(data);
      }
    };
    fetchMovie();
  }, [id]);

  if (errorMessage) {
    return <Page404 error={errorMessage} />;
  }

  if (!movie) {
    return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-400"></div>
    </div>) // animação que aparece enquanto se espera a requisição
  }

  return (
    <>
      <TopBar movieTitle={movie.title} />
      <VideoPlayer embedUrl={movie.link_drive} />
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
            movieContent={movie.release_year ?? "Não informado"}
          />
          <MovieInfo label="Genero" movieContent={movie.category.name} />
        </div>
      </div>
    </>
  );
}
