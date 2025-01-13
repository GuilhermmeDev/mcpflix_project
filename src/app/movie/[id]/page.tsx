"use client";
import { supabase } from "@/lib/supabaseClient";
import React from "react";
import { useEffect, useState } from "react";
import VideoPlayer from "./videoPlayer";

interface Props {
  params: { id: string };
}

export default function pageMovie({ params }: Props) {
  const [movie, setMovie] = useState<any | null>(null);

  const { id } = React.use(params);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setMovie(data ? data : null);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>carregando filme</p>;
  }

  return (
    <>
      <p>ID: {movie.id}</p>
      <p>Titulo: {movie.title}</p>
      <textarea
        name="synopsis"
        id={movie.id}
        value={movie.synopsis}
        readOnly
        className="bg-neutral-800"
      ></textarea>
      <VideoPlayer />
    </>
  );
}
