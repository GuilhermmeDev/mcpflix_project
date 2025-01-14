interface Movie {
  movieContent: string | number;
  label: string;
}

export default function MovieInfo({ movieContent, label }: Movie) {
  return (
    // componente que mostra algumas informações do filme
    <>
      <div className="text-center">
        <p className="font-medium">{label}</p>
        <p>{movieContent}</p>
      </div>
    </>
  );
}
