import Link from "next/link";
import Image from "next/image";
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
      <div className="relative bg-neutral-800 rounded-2xl overflow-hidden">
        <Image
          src={filme.link_cover}
          alt={filme.title}
          width={160}
          height={280}
          className="w-full max-w-40 h-72 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <p className="text-white font-medium">{filme.title}</p>
          <p className="text-xs text-gray-300">{filme.release_year}</p>
          <p className="text-xs text-gray-400">{filme.category?.name}</p>
        </div>
        <div className="absolute top-2 right-2">
          <i className="ri-play-fill text-white bg-black rounded-full p-2"></i>
        </div>
      </div>
    </Link>
  );
}
