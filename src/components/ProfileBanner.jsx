import "../assets/styles/components.css";
import "../assets/styles/animations.css";

export function ProfileBanner({ username }) {
  return (
    <section className="profile-banner fade-in full-width">
      <img
        src="src/assets/images/banner.jpg"
        alt="Banner de perfil"
        className="banner-bg"
      />
      <div className="overlay left-align">
        <div className="profile-info">
          <img
            src="src/assets/images/profile.jpg"
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <h2>{username}</h2>
        </div>
      </div>
    </section>
  );
}
