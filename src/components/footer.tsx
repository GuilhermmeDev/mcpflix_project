
export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white p-4 flex flex-col items-center absolute bottom-0 w-full">
      <div className="flex space-x-4 mb-4">
        <a href="https://github.com/GuilhermmeDev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <i className="ri-github-fill text-2xl"></i>
        </a>
      </div>
      <p className="text-sm text-gray-400 text-center">© {new Date().getFullYear()} GuilhermmeDev. Todos os direitos reservados.</p>
    </footer>
  );
}

