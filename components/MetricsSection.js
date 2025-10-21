export default function MetricsSection({ zoneData }) {
  if (!zoneData) return null;

  const { name, area, sensors, valves, status, statusColor, statusTextColor, metrics } = zoneData;
  
  // Manejar campos opcionales con valores por defecto
  const sensorsText = sensors || `${zoneData.sensorsActive || 0}/${zoneData.sensorsTotal || 0} sensores`;
  const valvesText = valves || 'N/A';
  const savings = metrics?.savings || 0;

  return (
    <div className="metrics-section">
      <div className="section-header">
        <div>
          <h3>{name}</h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            {area} • {sensorsText} • {valvesText}
          </p>
        </div>
        <span 
          className="status-badge" 
          style={{ 
            backgroundColor: statusColor,
            color: statusTextColor 
          }}
        >
          {status}
        </span>
      </div>

      <div className="metrics-grid">
        {/* Humedad */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: '#eff6ff' }}>
          <div className="metric-header">
            <div className="metric-icon blue">
              💧
            </div>
            <div className="metric-title">
              <h4>Humedad</h4>
              <p>Suelo actual</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#3b82f6' }}>{metrics.humidity}%</div>
          <div className="metric-progress">
            <div className="metric-progress-bar" style={{ width: `${metrics.humidity}%` }}></div>
          </div>
        </div>

        {/* Temperatura */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: '#fff7ed' }}>
          <div className="metric-header">
            <div className="metric-icon orange">
              🌡️
            </div>
            <div className="metric-title">
              <h4>Temperatura</h4>
              <p>Suelo actual</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#ea580c' }}>{metrics.temperature}°C</div>
          <div className="metric-info" style={{ color: '#ea580c' }}>Rango óptimo: {metrics.temperatureRange}</div>
        </div>

        {/* Flujo de agua */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: '#f0fdf4' }}>
          <div className="metric-header">
            <div className="metric-icon green">
              📊
            </div>
            <div className="metric-title">
              <h4>Flujo de agua</h4>
              <p>Litros/minuto</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#059669' }}>{metrics.waterFlow}</div>
          <div className="metric-info" style={{ color: '#059669' }}>{metrics.waterFlowText}</div>
        </div>

        {/* Ahorro */}
        <div className="metric-card shadow-lg" style={{ backgroundColor: '#faf5ff' }}>
          <div className="metric-header">
            <div className="metric-icon purple">
              📈
            </div>
            <div className="metric-title">
              <h4>Ahorro</h4>
              <p>Este mes</p>
            </div>
          </div>
          <div className="metric-value" style={{ color: '#9333ea' }}>{savings}%</div>
          <div className="metric-info" style={{ color: '#9333ea' }}>
            {savings === 0 ? 'Sin datos' : 'vs. riego tradicional'}
          </div>
        </div>
      </div>
    </div>
  );
}

