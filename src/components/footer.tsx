export default function Footer() {
  return (
    <footer className="relative bottom-0 mt-6 flex w-full flex-col items-center border-border border-t bg-sidebar p-4 text-white">
      <div className="mb-4 flex space-x-4 text-muted-foreground">
        <a
          className="hover:text-primary"
          href="https://github.com/GuilhermmeDev"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="ri-github-fill text-2xl" />
        </a>
      </div>
      <p className="text-center text-sm">
        © {new Date().getFullYear()} GuilhermmeDev. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
