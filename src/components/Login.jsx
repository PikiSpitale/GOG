import "../assets/styles/components.css";
import "../assets/styles/animations.css";

export function Login() {
  return (
    <section className="container fade-in">
      <div className="games-card" role="region" aria-labelledby="login-title">
        <h3 id="login-title">Iniciar sesión</h3>

        <div className="modal-fields" style={{ marginTop: "1rem" }}>
          <label htmlFor="login-identifier">
            Usuario o email
            <input
              id="login-identifier"
              type="text"
              name="identifier"
              placeholder="tu usuario o email"
              autoComplete="username"
            />
          </label>

          <label htmlFor="login-password">
            Contraseña
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
        </div>

        <div className="modal-actions" style={{ marginTop: "1.25rem" }}>
          <button type="button" className="btn-primary" aria-label="Entrar">
            Entrar
          </button>
        </div>

        <p style={{ marginTop: "1rem", color: "#94a3b8" }}>
          ¿No tienes cuenta? <a href="/register">Crear cuenta</a>
        </p>
      </div>
    </section>
  );
}

