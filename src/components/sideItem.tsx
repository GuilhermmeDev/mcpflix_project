import PropTypes from "prop-types";

interface SideItemProps {
  name: string;
  path: string;
}

export default function SideItem({ name, path }: SideItemProps) {
  return (
    <>
      <a className="flex flex-row items-center gap-2 mx-2 w-full" href="#">
        <i className={`${path} text-xl`} />

        <p className="text-neutral-300 text-base text-ellipsis overflow-hidden">
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
