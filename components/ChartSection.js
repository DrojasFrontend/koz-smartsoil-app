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

export default function ChartSection() {
  const [activeMetric, setActiveMetric] = useState('humedad');
  const [activeTimeRange, setActiveTimeRange] = useState('24h');

  // Datos simulados
  const generateChartData = () => {
    const hours = [];
    const now = new Date();
    
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      hours.push(time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }

    let data = [];
    if (activeMetric === 'humedad') {
      data = [60, 58, 55, 52, 45, 42, 40, 35, 33, 32, 35, 38, 42, 45, 50, 52, 55, 58, 60, 62, 60, 58, 55, 52, 42];
    } else if (activeMetric === 'temperatura') {
      data = [18, 18, 17, 17, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 24, 23, 22, 21, 20, 20, 19, 19, 18, 20];
    } else {
      data = [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    return {
      labels: hours,
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

  const currentValue = activeMetric === 'humedad' ? '41.7%' : activeMetric === 'temperatura' ? '19.7°C' : 'INACTIVO';

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
          <h3 style={{ fontSize: '18px', marginBottom: '1rem' }}>Datos en Tiempo Real - Zona 1</h3>
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
            <span className="chart-stat-value">{currentValue}</span>
            <span className="chart-stat-label">
              {activeMetric === 'humedad' ? 'Humedad Actual' : activeMetric === 'temperatura' ? 'Temperatura' : 'Estado Riego'}
            </span>
          </div>
          <div className="chart-stat">
            <span className="chart-stat-value">19.7°C</span>
            <span className="chart-stat-label">Temperatura</span>
          </div>
          <div className="chart-stat">
            <span className="chart-stat-value" style={{ color: '#6b7280' }}>INACTIVO</span>
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
            <p>Hace 2 horas</p>
          </div>
          <div className="schedule-item">
            <p>Próximo riego</p>
            <p>En 4 horas</p>
          </div>
        </div>
      </div>
    </>
  );
}

