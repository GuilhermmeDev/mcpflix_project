import Image from "next/image";
import SideItem from "./sideItem";
export default function Sidebar() {
  return (
    <aside className="w-1/12 min-w-16 ml-4 md:ml-8 my-8 bg-neutral-800 rounded-3xl p-4 flex flex-col items-center sm:w-fit">
      <Image
        src={"/mcpflix_logo.svg"}
        alt="logo_mcpflix"
        width={100}
        height={100}
      />

      <div className="w-full flex flex-col gap-6">
        <SideItem name={"Home"} path={"ri-home-5-line"} />

        <SideItem name={"Favoritos"} path={"ri-heart-3-line"} />

        <hr className="border-neutral-600 mx-2" />

        <SideItem name={"Perfil"} path={"ri-user-3-line"} />
        <SideItem name={"Configurações"} path={"ri-settings-4-line"} />
      </div>
    </aside>
  );
}
