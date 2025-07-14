interface SideItemProps {
  name: string;
  pathIcon: string;
  path: string;
}
export default function SideItem({ name, pathIcon, path }: SideItemProps) {
  // componente que cria cada elemento na barra de navegação
  return (
    <a
      className="flex w-full flex-row items-center justify-center gap-2 md:justify-start"
      href={path}
    >
      <i className={`${pathIcon} text-neutral-300 text-xl md:bg-transparent`} />

      <p className={'hidden overflow-hidden text-ellipsis text-base md:block'}>
        {name}
      </p>
    </a>
  );
}
