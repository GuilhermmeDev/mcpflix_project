interface SideItemProps {
  name: string;
  pathIcon: string;
  path: string;
}
export default function SideItem({ name, pathIcon, path }: SideItemProps) {
  // componente que cria cada elemento na barra de navegação
  return (
    <>
      <a
        className="flex flex-row items-center gap-2 w-full justify-center md:justify-start"
        href={path}
      >
        <i
          className={`${pathIcon} text-xl md:bg-transparent text-neutral-300`}
        />

        <p
          className={`text-base text-ellipsis overflow-hidden hidden md:block`}
        >
          {name}
        </p>
      </a>
    </>
  );
}