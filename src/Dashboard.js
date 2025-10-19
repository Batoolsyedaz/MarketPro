import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Sun, Moon, Search, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    transition: 'background-color 0.3s ease',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  darkBg: {
    background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
    color: 'white',
  },
  lightBg: {
    background: 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff, #ffffff)',
    color: '#0f172a',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid',
    padding: '1rem 2rem',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 0.25rem 0',
  },
  subtitle: {
    fontSize: '14px',
    margin: 0,
  },
  button: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '16px',
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  controls: {
    marginBottom: '2rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBox: {
    flex: 1,
    maxWidth: '400px',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem 1rem 0.5rem 2.5rem',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  dateButtons: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  dateBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  grid: {
    display: 'grid',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  kpiGrid: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  },
  chartsGrid: {
    gridTemplateColumns: '2fr 1fr',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
  },
  kpiCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  kpiIcon: {
    padding: '0.75rem',
    borderRadius: '8px',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiValue: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  kpiLabel: {
    fontSize: '14px',
    fontWeight: '500',
  },
  kpiChange: {
    fontSize: '14px',
    fontWeight: '600',
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  stockButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  stockBtn: {
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  footer: {
    marginTop: '3rem',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    borderTop: '1px solid',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const stockData = [
    { date: 'Jan 1', AAPL: 150, GOOGL: 95, MSFT: 310, AMZN: 140 },
    { date: 'Jan 2', AAPL: 152, GOOGL: 96, MSFT: 315, AMZN: 142 },
    { date: 'Jan 3', AAPL: 148, GOOGL: 94, MSFT: 312, AMZN: 138 },
    { date: 'Jan 4', AAPL: 155, GOOGL: 98, MSFT: 320, AMZN: 145 },
    { date: 'Jan 5', AAPL: 158, GOOGL: 100, MSFT: 325, AMZN: 148 },
    { date: 'Jan 6', AAPL: 162, GOOGL: 102, MSFT: 330, AMZN: 152 },
    { date: 'Jan 7', AAPL: 165, GOOGL: 105, MSFT: 335, AMZN: 155 }
  ];

  const portfolioData = [
    { name: 'Tech Stocks', value: 45, fill: '#3b82f6' },
    { name: 'Bonds', value: 25, fill: '#10b981' },
    { name: 'Crypto', value: 20, fill: '#f59e0b' },
    { name: 'Cash', value: 10, fill: '#8b5cf6' }
  ];

  const performanceData = [
    { metric: 'AAPL', performance: 10 },
    { metric: 'GOOGL', performance: 5 },
    { metric: 'MSFT', performance: 8 },
    { metric: 'AMZN', performance: 11 }
  ];

  const kpiCards = [
    { label: 'Total Portfolio', value: '$125,450', change: '+12.5%', icon: DollarSign, positive: true },
    { label: 'Daily Return', value: '$2,340', change: '+4.2%', icon: TrendingUp, positive: true },
    { label: 'Market Health', value: '78/100', change: '+2.1%', icon: Activity, positive: true },
    { label: '30-Day Avg', value: '$3,250', change: '-1.8%', icon: TrendingDown, positive: false }
  ];

  const filteredData = stockData.slice(-parseInt(dateRange));

  return (
    <div style={{
      ...styles.container,
      ...(darkMode ? styles.darkBg : styles.lightBg)
    }}>
      {/* Header */}
      <header style={{
        ...styles.header,
        backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderColor: darkMode ? '#475569' : '#bfdbfe'
      }}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={{
              ...styles.logo,
              backgroundColor: darkMode ? '#1e40af' : '#3b82f6'
            }}>
              📊
            </div>
            <div>
              <h1 style={styles.title}>Market Pro</h1>
              <p style={{...styles.subtitle, color: darkMode ? '#94a3b8' : '#64748b'}}>Real-time Market Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.button,
              backgroundColor: darkMode ? '#334155' : '#dbeafe',
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.searchBox}>
            <Search size={20} style={{position: 'absolute', left: '10px', top: '8px', color: '#94a3b8'}} />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...styles.searchInput,
                backgroundColor: darkMode ? '#334155' : 'white',
                borderColor: darkMode ? '#475569' : '#bfdbfe',
                color: darkMode ? 'white' : 'black',
              }}
            />
          </div>
          <div style={styles.dateButtons}>
            {['1d', '7d', '30d', '90d'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                style={{
                  ...styles.dateBtn,
                  backgroundColor: dateRange === range 
                    ? (darkMode ? '#2563eb' : '#3b82f6')
                    : (darkMode ? '#334155' : '#dbeafe'),
                  color: dateRange === range ? 'white' : (darkMode ? 'white' : '#000')
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{...styles.grid, ...styles.kpiGrid}}>
          {kpiCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                style={{
                  ...styles.card,
                  backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                  borderColor: darkMode ? '#475569' : '#bfdbfe',
                  ...styles.kpiCard
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                  <div style={{
                    ...styles.kpiIcon,
                    backgroundColor: darkMode ? '#1e293b' : '#f0f9ff'
                  }}>
                    <IconComponent size={20} color={card.positive ? '#22c55e' : '#ef4444'} />
                  </div>
                  <span style={{...styles.kpiChange, color: card.positive ? '#22c55e' : '#ef4444'}}>
                    {card.change}
                  </span>
                </div>
                <p style={{...styles.kpiLabel, color: darkMode ? '#94a3b8' : '#64748b', margin: 0}}>
                  {card.label}
                </p>
                <p style={{...styles.kpiValue, margin: 0}}>{card.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div style={{...styles.grid, ...styles.chartsGrid}}>
          {/* Stock Chart */}
          <div style={{
            ...styles.card,
            backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            borderColor: darkMode ? '#475569' : '#bfdbfe'
          }}>
            <h2 style={styles.chartTitle}>Stock Performance</h2>
            <div style={styles.stockButtons}>
              {['AAPL', 'GOOGL', 'MSFT', 'AMZN'].map(stock => (
                <button
                  key={stock}
                  onClick={() => setSelectedMetric(selectedMetric === stock ? 'all' : stock)}
                  style={{
                    ...styles.stockBtn,
                    backgroundColor: selectedMetric === stock || selectedMetric === 'all' 
                      ? (darkMode ? '#2563eb' : '#3b82f6')
                      : (darkMode ? '#334155' : '#f3f4f6'),
                    color: selectedMetric === stock || selectedMetric === 'all' ? 'white' : (darkMode ? 'white' : 'black')
                  }}
                >
                  {stock}
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#475569' : '#bfdbfe'} />
                <XAxis dataKey="date" stroke={darkMode ? '#94a3b8' : '#64748b'} />
                <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
                <Tooltip contentStyle={{
                  backgroundColor: darkMode ? '#1e293b' : '#f0f9ff',
                  border: `1px solid ${darkMode ? '#475569' : '#bfdbfe'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#fff' : '#000'
                }} />
                <Legend />
                {(selectedMetric === 'all' || selectedMetric === 'AAPL') && <Line type="monotone" dataKey="AAPL" stroke="#3b82f6" strokeWidth={2} />}
                {(selectedMetric === 'all' || selectedMetric === 'GOOGL') && <Line type="monotone" dataKey="GOOGL" stroke="#ef4444" strokeWidth={2} />}
                {(selectedMetric === 'all' || selectedMetric === 'MSFT') && <Line type="monotone" dataKey="MSFT" stroke="#10b981" strokeWidth={2} />}
                {(selectedMetric === 'all' || selectedMetric === 'AMZN') && <Line type="monotone" dataKey="AMZN" stroke="#f59e0b" strokeWidth={2} />}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Portfolio Pie Chart */}
          <div style={{
            ...styles.card,
            backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            borderColor: darkMode ? '#475569' : '#bfdbfe'
          }}>
            <h2 style={styles.chartTitle}>Portfolio Mix</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={portfolioData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} dataKey="value">
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{
                  backgroundColor: darkMode ? '#1e293b' : '#f0f9ff',
                  border: `1px solid ${darkMode ? '#475569' : '#bfdbfe'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#fff' : '#000'
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Bar Chart */}
        <div style={{
          ...styles.card,
          backgroundColor: darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          borderColor: darkMode ? '#475569' : '#bfdbfe'
        }}>
          <h2 style={styles.chartTitle}>Performance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#475569' : '#bfdbfe'} />
              <XAxis dataKey="metric" stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
              <Tooltip contentStyle={{
                backgroundColor: darkMode ? '#1e293b' : '#f0f9ff',
                border: `1px solid ${darkMode ? '#475569' : '#bfdbfe'}`,
                borderRadius: '8px',
                color: darkMode ? '#fff' : '#000'
              }} />
              <Bar dataKey="performance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        ...styles.footer,
        borderColor: darkMode ? '#475569' : '#bfdbfe',
        color: darkMode ? '#94a3b8' : '#64748b'
      }}>
        <p>Market Pro • Real-time market data • Last updated: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  );
}