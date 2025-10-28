import "../assets/styles/components.css";
import "../assets/styles/animations.css";

export function Register() {
  return (
    <section className="container fade-in">
      <div
        className="games-card"
        role="region"
        aria-labelledby="register-title"
      >
        <h3 id="register-title">Crear cuenta</h3>

        <div className="modal-fields" style={{ marginTop: "1rem" }}>
          <label htmlFor="register-username">
            Usuario
            <input
              id="register-username"
              type="text"
              name="username"
              placeholder="tu usuario"
              autoComplete="username"
            />
          </label>

          <label htmlFor="register-email">
            Email
            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </label>

          <label htmlFor="register-password">
            Contraseña
            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </label>

          <label htmlFor="register-confirm">
            Confirmar contraseña
            <input
              id="register-confirm"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </label>
        </div>

        <div className="modal-actions" style={{ marginTop: "1.25rem" }}>
          <button
            type="button"
            className="btn-primary"
            aria-label="Registrarse"
          >
            Registrarse
          </button>
        </div>

        <p style={{ marginTop: "1rem", color: "#94a3b8" }}>
          ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </section>
  );
}
