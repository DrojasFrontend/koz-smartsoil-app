import zonesData from '../data/zones.json';

export default function ZoneTabs({ activeZone, onZoneChange }) {
  const handleZoneClick = (zoneId) => {
    if (onZoneChange) {
      onZoneChange(zoneId);
    }
  };

  return (
    <div className="zone-tabs">
      {zonesData.zones.map((zone) => (
        <button
          key={zone.id}
          className={`zone-tab ${activeZone === zone.id ? 'active' : ''}`}
          onClick={() => handleZoneClick(zone.id)}
        >
          <span className="zone-icon">{zone.icon}</span>
          <div className="zone-info">
            <h3>{zone.name}</h3>
            <p>{zone.area} • {zone.sensors}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

