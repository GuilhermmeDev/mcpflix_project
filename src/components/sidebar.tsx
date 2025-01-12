import Image from "next/image";
import SideItem from "./sideItem";
export default function Sidebar() {
  return (
    <aside className="md:max-h-full md:relative max-h-24 w-fit min-w-16 md:ml-8 my-4 md:my-8 bg-neutral-800 rounded-3xl p-4 flex md:flex-col items-center sm:w-fit flex-row absolute bottom-2">
      <Image
        src={"/mcpflix_logo.svg"}
        alt="logo_mcpflix"
        width={100}
        height={50}
        className=""
      />

      <div className="w-full flex md:flex-col gap-6 flex-row">
        <SideItem name={"Home"} path={"ri-home-5-line"} />

        <SideItem name={"Favoritos"} path={"ri-heart-3-line"} />

        <hr className="border-neutral-600 mx-2 hidden md:block" />

        <SideItem name={"Perfil"} path={"ri-user-3-line"} />
        <SideItem name={"Configurações"} path={"ri-settings-4-line"} />
      </div>
    </aside>
  );
}
