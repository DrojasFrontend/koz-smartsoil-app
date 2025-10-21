export default function Header({ lastUpdate, isLoading }) {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const getLastUpdateText = () => {
    if (!lastUpdate) return 'Cargando...';
    const now = new Date();
    const diffMs = now - lastUpdate;
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 10) return 'Ahora';
    if (diffSec < 60) return `Hace ${diffSec}s`;
    const diffMin = Math.floor(diffSec / 60);
    return `Hace ${diffMin}m`;
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
              <p>Dashboard de Riego {isLoading && <span style={{ color: '#10b981' }}>●</span>}</p>
            </div>
          </div>

          <div className="header-right col-12 col-lg-6 d-flex flex-lg-row flex-column gap-2 justify-content-end">
            <div className="datetime">
              <div className="time">{getCurrentTime()}</div>
              <div className="date">{getCurrentDate()}</div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                Actualizado: {getLastUpdateText()}
              </div>
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

