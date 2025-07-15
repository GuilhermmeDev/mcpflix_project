'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/auth/checkAuth';
import Page404 from '@/components/404';
import MovieInfo from '@/components/movieInfo';
import TopBar from '@/components/topBar';
import { supabase } from '@/lib/supabaseClient';
import Fav from './fav';
import VideoPlayer from './videoPlayer';

interface Movie {
  id: number;
  title: string;
  release_year: number | undefined;
  duration: number;
  synopsis: string | undefined;
  link_drive: string;
  category: { name: string };
}

interface Props {
  params: Promise<{ id: number }>;
}

export default function PageMovie({ params }: Props) {
  useAuth();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = React.use(params); // resgata o id do filme que está na URL (movie/id)

  useEffect(() => {
    const fetchMovie = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*, category:category_id(name)')
        .eq('id', id)
        .single(); // retorna APENAS um filme que foi encontrado com tais condições

      if (error) {
        setErrorMessage('Filme não encontrado');
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
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-primary border-t-2 border-b-2" />
      </div>
    ); // animação que aparece enquanto se espera a requisição
  }

  return (
    <>
      <TopBar movieTitle={movie.title} />
      <VideoPlayer embedUrl={movie.link_drive} />
      <div className="mx-8 mt-6 flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-3xl">{movie.title}</p>
          <Fav movieId={movie.id} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-2xl">Descrição</p>
          <p className="text-gray-300 text-sm">
            {movie.synopsis ?? 'Este filme não possui descrição.'}
          </p>
        </div>
        <div className="grid w-full grid-cols-3 md:w-1/4">
          <MovieInfo label="Duração" movieContent={movie.duration} />
          <MovieInfo
            label="Data de Lançamento"
            movieContent={movie.release_year ?? 'Não informado'}
          />
          <MovieInfo label="Genero" movieContent={movie.category.name} />
        </div>
      </div>
    </>
  );
}
