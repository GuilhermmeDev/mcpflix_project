'use client';

import { useEffect, useState } from 'react';
import useAuth from '@/auth/checkAuth';
import { AlertError } from '@/components/alert_error';
import Movie from '@/components/movie';
import TopBar from '@/components/topBar';
import { supabase } from '@/lib/supabaseClient';

interface MovieModel {
  id: number;
  link_cover: string;
  title: string;
  release_year: number;
  category: { name: string };
}

export default function FavPage() {
  useAuth();
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    const fetchFavs = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const userFavs: number[] = data.user.user_metadata.favs;
        if (userFavs.length > 0) {
          const { data, error } = await supabase
            .from('movies')
            .select('*, category:category_id(name)')
            .in('id', userFavs);

          if (error) {
            <AlertError error={`${error}`} />;
          } else {
            setMovies(data);
          }
        }
      }
    };
    fetchFavs();
  }, []);

  return (
    <>
      <TopBar movieTitle="Favoritos" />
      <div className="h-fit w-full overflow-y-hidden">
        <ul className="mt-12 ml-6 flex w-fit flex-row flex-wrap justify-center md:justify-start">
          {movies.map((movie) => (
            <li
              className="items-left mr-8 flex min-w-40 flex-col justify-center gap-2 p-4"
              key={movie.id}
            >
              <Movie filme={movie} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
