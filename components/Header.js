export default function Header() {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="row">
          <div className="logo-section col-12 col-lg-6 mb-lg-0 mb-4">
            <div className="logo">
              🌱
            </div>
            <div className="logo-text">
              <h1>KOZ SmartSoil</h1>
              <p>Dashboard de Riego</p>
            </div>
          </div>

          <div className="header-right col-12 col-lg-6 d-flex flex-lg-row flex-column gap-2 justify-content-end">
            <div className="datetime">
              <div className="time">{getCurrentTime()}</div>
              <div className="date">{getCurrentDate()}</div>
            </div>

            <button className="notification-btn">
              🔔
              <span>3</span>
              <span className="notification-badge">3</span>
            </button>

            <button className="export-btn">
              📥
              <span>Exportar datos</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

