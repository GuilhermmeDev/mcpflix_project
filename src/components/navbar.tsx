export default function Navbar() {
  return (
    <>
      <nav className="flex flex-row h-fit my-8 w-full justify-center">
        <input
          type="text"
          name="search"
          id="search_input"
          className="rounded-2xl bg-neutral-800 px-6 mr-4 w-2/5"
        />

        <div className="flex flex-row items-center bg-neutral-800 p-2 rounded-full gap-4">
          <img
            src="/globe.svg"
            alt="user icon"
            width={40}
            className="rounded-3xl"
          />

          <p>UserAccount</p>
        </div>
      </nav>
    </>
  );
}
