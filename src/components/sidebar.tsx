import Image from 'next/image';
import SideItem from './sideItem';
export default function Sidebar() {
  return (
    // tag aside é responsiva e toma diferentes comportamentos dependendo da resolução da tela
    <aside className="fixed bottom-2 z-10 my-4 flex max-h-24 w-fit min-w-16 flex-row items-center rounded-3xl bg-card p-4 text-foreground sm:w-fit md:sticky md:top-1/6 md:my-8 md:ml-8 md:max-h-fit md:flex-col">
      <Image
        alt="logo_mcpflix"
        className="mx-4 md:my-8"
        height={100}
        src={'/logo_mcpflix.svg'}
        width={120}
      />

      <div className="flex w-full flex-row gap-6 md:flex-col">
        <SideItem name={'Home'} path="/" pathIcon={'ri-home-5-line'} />

        <SideItem name={'Favoritos'} path="/fav" pathIcon={'ri-heart-3-line'} />

        <hr className="mx-2 hidden md:block" />
      </div>
    </aside>
  );
}
