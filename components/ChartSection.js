import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartSection({ zoneData }) {
  const [activeMetric, setActiveMetric] = useState('humedad');
  const [activeTimeRange, setActiveTimeRange] = useState('24h');

  if (!zoneData) return null;

  // Datos dinámicos por zona
  const generateChartData = () => {
    let data = [];
    let labels = [];
    
    // Obtener datos según el rango de tiempo seleccionado
    if (activeTimeRange === '24h') {
      // Últimas 24 horas
      if (activeMetric === 'humedad') {
        data = zoneData.chartData?.humidityData || [];
      } else if (activeMetric === 'temperatura') {
        data = zoneData.chartData?.temperatureData || [];
      } else {
        // Datos de riego basados en el estado
        const isActive = zoneData.chartData?.irrigationStatus === 'ACTIVO';
        data = isActive 
          ? Array(19).fill(0).concat(Array(6).fill(1))
          : Array(6).fill(1).concat(Array(19).fill(0));
      }
      
      // Generar labels de tiempo por hora
      const now = new Date();
      const dataLength = data.length;
      for (let i = dataLength - 1; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
      }
    } else if (activeTimeRange === '7d') {
      // Últimos 7 días
      if (activeMetric === 'humedad') {
        data = zoneData.chartDataWeek?.humidityData || [];
      } else if (activeMetric === 'temperatura') {
        data = zoneData.chartDataWeek?.temperatureData || [];
      } else {
        data = Array(7).fill(0);
      }
      
      // Labels por día
      const now = new Date();
      const dataLength = data.length;
      for (let i = dataLength - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }));
      }
    } else if (activeTimeRange === '30d') {
      // Últimos 30 días
      if (activeMetric === 'humedad') {
        data = zoneData.chartDataMonth?.humidityData || [];
      } else if (activeMetric === 'temperatura') {
        data = zoneData.chartDataMonth?.temperatureData || [];
      } else {
        data = Array(30).fill(0);
      }
      
      // Labels por día
      const now = new Date();
      const dataLength = data.length;
      for (let i = dataLength - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }));
      }
    }

    return {
      labels: labels,
      datasets: [
        {
          label: activeMetric === 'humedad' ? 'Humedad (%)' : activeMetric === 'temperatura' ? 'Temperatura (°C)' : 'Riego',
          data: data,
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const currentValue = activeMetric === 'humedad' 
    ? zoneData.chartData.currentHumidity 
    : activeMetric === 'temperatura' 
    ? zoneData.chartData.currentTemperature 
    : zoneData.chartData.irrigationStatus;

  return (
    <>
      <div className="chart-section shadow-lg">
        <div className="chart-header">
          <div>
            <h3>Datos Históricos</h3>
            <div className="d-flex gap-2" style={{ marginTop: '0.5rem' }}>
              <button
                className={`chart-tab ${activeTimeRange === '24h' ? 'active' : ''}`}
                onClick={() => setActiveTimeRange('24h')}
              >
                Últimas 24h
              </button>
              <button
                className={`chart-tab ${activeTimeRange === '7d' ? 'active' : ''}`}
                onClick={() => setActiveTimeRange('7d')}
              >
                7 días
              </button>
              <button
                className={`chart-tab ${activeTimeRange === '30d' ? 'active' : ''}`}
                onClick={() => setActiveTimeRange('30d')}
              >
                30 días
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '1rem' }}>Datos en Tiempo Real - Zona {zoneData.id + 1}</h3>
          <div className="chart-tabs d-flex flex-lg-row flex-column gap-2 mb-4">
            <button
              className={`chart-tab ${activeMetric === 'humedad' ? 'active' : ''}`}
              onClick={() => setActiveMetric('humedad')}
            >
              Humedad del Suelo (%)
            </button>
            <button
              className={`chart-tab ${activeMetric === 'temperatura' ? 'active' : ''}`}
              onClick={() => setActiveMetric('temperatura')}
            >
              Temperatura (°C)
            </button>
            <button
              className={`chart-tab ${activeMetric === 'riego' ? 'active' : ''}`}
              onClick={() => setActiveMetric('riego')}
            >
              Riego Activo
            </button>
          </div>
        </div>

        <div className="chart-container">
          <Line data={generateChartData()} options={options} />
        </div>

        <div className="chart-stats">
          <div className="chart-stat">
            <span className="chart-stat-value" style={{ 
              color: activeMetric === 'riego' ? (zoneData.chartData.irrigationStatus === 'ACTIVO' ? '#059669' : '#6b7280') : '#1f2937' 
            }}>
              {currentValue}
            </span>
            <span className="chart-stat-label">
              {activeMetric === 'humedad' ? 'Humedad Actual' : activeMetric === 'temperatura' ? 'Temperatura' : 'Estado Riego'}
            </span>
          </div>
          <div className="chart-stat">
            <span className="chart-stat-value">{zoneData.chartData.currentTemperature}</span>
            <span className="chart-stat-label">Temperatura</span>
          </div>
          <div className="chart-stat">
            <span className="chart-stat-value" style={{ 
              color: zoneData.chartData.irrigationStatus === 'ACTIVO' ? '#059669' : '#6b7280' 
            }}>
              {zoneData.chartData.irrigationStatus}
            </span>
            <span className="chart-stat-label">Estado Riego</span>
          </div>
        </div>
      </div>

      {/* Programación de Riego */}
      <div className="schedule-card shadow-lg">
        <div className="schedule-header">
          <span>📅</span>
          <h4>Programación de Riego</h4>
        </div>
        <div className="schedule-info">
          <div className="schedule-item">
            <p>Último riego</p>
            <p>{zoneData.schedule.lastIrrigation}</p>
          </div>
          <div className="schedule-item">
            <p>Próximo riego</p>
            <p style={{ 
              color: zoneData.schedule.nextIrrigation === 'Ahora' ? '#059669' : '#1f2937',
              fontWeight: zoneData.schedule.nextIrrigation === 'Ahora' ? '700' : '600'
            }}>
              {zoneData.schedule.nextIrrigation}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

