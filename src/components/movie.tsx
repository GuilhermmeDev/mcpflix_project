import Image from 'next/image';
import Link from 'next/link';

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
      <div className="relative overflow-hidden rounded-2xl bg-neutral-800">
        <Image
          alt={filme.title}
          className="h-72 w-full max-w-40 object-cover transition-transform duration-300 hover:scale-105"
          height={280}
          src={filme.link_cover}
          width={160}
        />
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-2">
          <p className="font-medium text-white">{filme.title}</p>
          <p className="text-gray-300 text-xs">{filme.release_year}</p>
          <p className="text-gray-400 text-xs">{filme.category?.name}</p>
        </div>
        <div className="absolute top-2 right-2">
          <i className="ri-play-fill rounded-full bg-black p-2 text-white" />
        </div>
      </div>
    </Link>
  );
}
