import Image from "next/image";
import SideItem from "./sideItem";
export default function Sidebar() {
  return (
    <aside className="w-48 mx-8 my-8 bg-neutral-800 rounded-3xl p-4 flex flex-col">
      <Image
        src={"/mcpflix_logo.svg"}
        alt="logo_mcpflix"
        width={150}
        height={150}
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
