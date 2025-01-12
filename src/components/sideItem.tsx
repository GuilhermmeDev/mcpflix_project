import PropTypes from "prop-types";

interface SideItemProps {
  name: string;
  path: string;
}
export default function SideItem({ name, path }: SideItemProps) {
  return (
    <>
      <a
        className="flex flex-row items-center gap-2 w-full justify-center md:justify-start"
        href="#"
      >
        <i className={`${path} text-xl md:bg-transparent text-neutral-300`} />

        <p
          className={`text-base text-ellipsis overflow-hidden hidden md:block`}
        >
          {name}
        </p>
      </a>
    </>
  );
}

SideItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
