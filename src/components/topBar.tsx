import Link from "next/link";

interface Prop {
  movieTitle: string;
}

export default function TopBar({ movieTitle }: Prop) {
  return (
    <>
      <div className="w-full bg-black/30 z-10 backdrop-blur-sm h-fit absolute top-0 flex flex-row justify-between py-2">
        <Link href={"/"} passHref>
          <i className="ri-arrow-left-line pl-6 text-xl"></i>
        </Link>
        <p>{movieTitle}</p>
        <i className="ri-flag-line pr-6 text-xl"></i>
      </div>
    </>
  );
}
