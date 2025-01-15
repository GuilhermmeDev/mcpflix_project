"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

interface FavProps {
  movieId: number;
}

export default function Fav({ movieId }: FavProps) {
  const [fav, setFav] = useState<boolean>(false);

  useEffect(() => {
    const changeFav = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const userFavs = data.user.user_metadata.favs;
        if (fav) {
          userFavs.push(movieId);
        } else {
          userFavs.pop();
        }

        console.log(userFavs);
      }
    };
    changeFav();
  });
  return (
    <>
      <i
        className={`${
          fav ? "ri-heart-3-fill text-green-400" : "ri-heart-3-line text-white"
        } text-3xl`}
        onClick={() => (fav ? setFav(false) : setFav(true))}
      ></i>
    </>
  );
}
