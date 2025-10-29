import "../assets/styles/components.css";

export function ProfileTabs({ tabs, activeTab, onTabChange }) {
  const handleTabClick = (tabId) => {
    if (tabId === activeTab) {
      return;
    }
    onTabChange(tabId);
  };

  return (
    <div className="profile-tabs" role="tablist" aria-label="Secciones de perfil">
      {tabs.map(({ id, label }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            type="button"
            className={`profile-tab${isActive ? " is-active" : ""}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleTabClick(id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
