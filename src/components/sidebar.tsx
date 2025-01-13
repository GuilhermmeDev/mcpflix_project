import Image from "next/image";
import SideItem from "./sideItem";
export default function Sidebar() {
  return (
    <aside className="md:max-h-full md:sticky md:top-1/4 max-h-24 w-fit min-w-16 md:ml-8 my-4 md:my-8 bg-neutral-800 rounded-3xl p-4 flex md:flex-col items-center sm:w-fit flex-row fixed bottom-2">
      <Image
        src={"/mcpflix_logo.svg"}
        alt="logo_mcpflix"
        width={100}
        height={50}
        className=""
      />

      <div className="w-full flex md:flex-col gap-6 flex-row">
        <SideItem name={"Home"} pathIcon={"ri-home-5-line"} path="/" />

        <SideItem name={"Favoritos"} pathIcon={"ri-heart-3-line"} path="/fav" />

        <hr className="border-neutral-600 mx-2 hidden md:block" />

        <SideItem name={"Perfil"} pathIcon={"ri-user-3-line"} path="/profile" />
        <SideItem
          name={"Configurações"}
          pathIcon={"ri-settings-4-line"}
          path="/config"
        />
      </div>
    </aside>
  );
}
