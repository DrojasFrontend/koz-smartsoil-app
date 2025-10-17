export default function CampoBanner() {
  return (
    <div className="campo-banner p-lg-5 p-4">
    <div className="row">
      <div className="campo-header col-12 col-lg-6 mb-lg-0 mb-4">
        <h2>Campo San José</h2>
        <p className="campo-location m-0">Melipilla, Región Metropolitana • 8.0 hectáreas</p>
      </div>

      <div className="campo-stats col-12 col-lg-6">
        <div className="stat-item">
          <span className="stat-value">4</span>
          <span className="stat-label">Zonas activas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">23</span>
          <span className="stat-label">Sensores</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">11</span>
          <span className="stat-label">Válvulas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">47%</span>
          <span className="stat-label">Ahorro promedio</span>
        </div>
      </div>
    </div>
    </div>
  );
}

