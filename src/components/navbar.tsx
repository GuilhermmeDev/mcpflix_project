export default function Navbar() {
  return (
    <>
      <nav className="flex flex-row h-fit my-8 w-full justify-center gap-4">
        <select
          name="genrer"
          id="genrer"
          className="flex items-center justify-center  bg-neutral-800 p-4 rounded-full focus:outline-none text-sm"
        >
          <option value="all">Todos</option>
          <option value="terror">Terror</option>
          <option value="fun">Comédia</option>
          <option value="action">Ação</option>
        </select>
        <div className="mr-4 w-2/5 bg-neutral-800 text-sm flex flex-row rounded-2xl px-4 flex items-center">
          <input
            type="text"
            name="search"
            id="search_input"
            placeholder="Que filme você quer assistir?"
            className="w-full h-full bg-transparent focus:outline-none border-none"
          />

          <i className="ri-search-line text-lg"></i>
        </div>

        <div className="flex flex-row items-center bg-neutral-800 p-2 px-4 rounded-full gap-2">
          <img
            src="/globe.svg"
            alt="user icon"
            width={30}
            className="rounded-3xl"
          />

          <p className="text-neutral-300 text-sm">UserAccount</p>
        </div>
      </nav>
    </>
  );
}
