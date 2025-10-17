import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import CampoBanner from '../components/CampoBanner';
import ZoneTabs from '../components/ZoneTabs';
import MetricsSection from '../components/MetricsSection';
import ChartSection from '../components/ChartSection';
import ControlPanel from '../components/ControlPanel';
import zonesData from '../data/zones.json';

export default function Home() {
  const [activeZone, setActiveZone] = useState(0);

  const currentZoneData = zonesData.zones.find(zone => zone.id === activeZone);

  const handleZoneChange = (zoneId) => {
    setActiveZone(zoneId);
  };

  return (
    <>
      <Head>
        <title>KOZ SmartSoil - Plataforma de Riego Inteligente</title>
        <meta name="description" content="Sistema de riego inteligente para agricultura de precisión" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Header />
        
        <main className="px-3 pb-5">
          <CampoBanner />
          <ZoneTabs activeZone={activeZone} onZoneChange={handleZoneChange} />
          <MetricsSection zoneData={currentZoneData} />
          
          {/* Layout de 2 columnas */}
          <div className="two-column-layout">
            <div className="main-column">
              <ChartSection />
            </div>
            <div className="sidebar-column">
              <ControlPanel />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

