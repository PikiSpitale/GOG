import "../assets/styles/components.css";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/perfil", label: "Perfil" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/login", label: "Iniciar sesión" },
  { href: "/register", label: "Registrarse" },
];

export function Header() {
  return (
    <header>
      <h1>GoodOldGames</h1>
      <nav aria-label="Navegación principal">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
