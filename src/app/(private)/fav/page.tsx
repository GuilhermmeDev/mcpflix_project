"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Movie from "@/components/movie";
import TopBar from "@/components/topBar";
import useAuth from "@/auth/checkAuth";
export default function FavPage() {
  useAuth();
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavs = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const userFavs: number[] = data.user.user_metadata.favs;
        if (userFavs.length > 0) {
          const { data, error } = await supabase
            .from("movies")
            .select("*, category:category_id(name)")
            .in("id", userFavs);

          if (error) {
            console.error(error);
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
      <div className="w-full h-fit overflow-y-hidden">
        <ul className="flex flex-row w-fit ml-6 mt-12 flex-wrap md:justify-start justify-center">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex flex-col items-left justify-center p-4 mr-8 gap-2 min-w-40"
            >
              <Movie filme={movie} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
