import Link from 'next/link';

interface Prop {
  movieTitle: string;
}

export default function TopBar({ movieTitle }: Prop) {
  return (
    <div className="absolute top-0 z-10 flex h-fit w-full flex-row justify-between bg-black/30 py-2 backdrop-blur-sm">
      <Link href={'/dashboard'} passHref>
        <i className="ri-arrow-left-line pl-6 text-xl" />
      </Link>
      <p>{movieTitle}</p>
      <i className="ri-flag-line pr-6 text-xl" />
    </div>
  );
}
