import Image from "next/image";
import SideItem from "./sideItem";
export default function Sidebar() {
  return (
    // tag aside é responsiva e toma diferentes comportamentos dependendo da resolução da tela
    <aside className="md:max-h-fit md:sticky md:top-1/6 max-h-24 w-fit min-w-16 md:ml-8 my-4 md:my-8 bg-neutral-800 rounded-3xl p-4 flex md:flex-col items-center sm:w-fit flex-row fixed bottom-2 z-10">
      <Image
        src={"/logo_mcpflix.svg"}
        alt="logo_mcpflix"
        width={120}
        height={100}
        className="md:my-8 mx-4"
      />

      <div className="w-full flex md:flex-col gap-6 flex-row">
        <SideItem name={"Home"} pathIcon={"ri-home-5-line"} path="/" />

        <SideItem name={"Favoritos"} pathIcon={"ri-heart-3-line"} path="/fav" />

        <hr className="border-neutral-600 mx-2 hidden md:block" />

      </div>
    </aside>
  );
}
