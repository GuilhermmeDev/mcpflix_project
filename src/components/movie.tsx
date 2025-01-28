import Link from "next/link";

interface movieProps {
  filme: {
    id: number;
    link_cover: string;
    title: string;
    release_year: number;
    category?: { name: string };
  };
}

export default function Movie({ filme }: movieProps) {
  return (
    <Link href={`/movie/${filme.id}`} passHref>
      <img
        src={filme.link_cover}
        alt="logo_mcpflix"
        width={150}
        className="rounded-2xl py-1 h-56"
      />
      <p className="bg-neutral-700 p-2 rounded-2xl text-xs w-fit">
        {filme.category?.name}
      </p>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-base font-medium">{filme.title}</p>
          <p className="text-xs">{filme.release_year}</p>
        </div>
        <i className="ri-play-fill text-black bg-white rounded-full py-2 px-3"></i>
      </div>
    </Link>
  );
}
