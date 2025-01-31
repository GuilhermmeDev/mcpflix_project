"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

interface FavProps {
  movieId: number;
}

export default function Fav({ movieId }: FavProps) {
  const [fav, setFav] = useState<boolean>(false);

  const addMovieFav = (userFavs: number[]) => {
    const isFav = userFavs.includes(movieId);
    setFav(isFav);
  };

  useEffect(() => {
    // verifica se o filme ja foi favoritado pelo usuario anteriormente
    const fetchUserFavs = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const userFavs = data.user.user_metadata.favs;
        if (userFavs) {
          addMovieFav(userFavs);
        } else {
          const { data: session } = await supabase.auth.getSession();

          if (session) {
            const { data } = await supabase.auth.updateUser({
              // garante que há a seção de favoritos nos metadados do user
              data: {
                favs: [],
              },
            });
            addMovieFav(data.user.user_metadata.favs);
          }
        }
      }
    };
    fetchUserFavs();
  }, [movieId]);

  const handleFavClick = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      let userFavs = data.user.user_metadata.favs;

      if (fav) {
        userFavs = userFavs.filter((id: number) => id !== movieId); // remove o id do filme do array
      } else {
        // add o id do filme no array
        userFavs.push(movieId);
      }

      // muda os metadados com o supabase
      const { error } = await supabase.auth.updateUser({
        data: { favs: userFavs },
      });

      if (error) {
        console.error(error.message);
      } else {
        setFav(!fav); // se era favoritado agora não é mais, e se não era agora é :) kkk
      }
    }
  };
  return (
    <>
      <i
        className={`${
          fav ? "ri-heart-3-fill text-green-400" : "ri-heart-3-line text-white"
        } text-3xl`}
        onClick={handleFavClick}
      ></i>
    </>
  );
}
