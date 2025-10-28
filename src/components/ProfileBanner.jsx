import "../assets/styles/components.css";
import "../assets/styles/animations.css";
import bannerImage from "../assets/images/banner.jpg";
import profileImage from "../assets/images/profile.jpg";

export function ProfileBanner({
  username,
  bannerSrc = bannerImage,
  avatarSrc = profileImage,
}) {
  return (
    <section className="profile-banner fade-in full-width">
      <img src={bannerSrc} alt="Banner de perfil" className="banner-bg" />
      <div className="overlay left-align">
        <div className="profile-info">
          <img
            src={avatarSrc}
            alt={`Foto de perfil de ${username}`}
            className="profile-avatar"
          />
          <h2>{username}</h2>
        </div>
      </div>
    </section>
  );
}
