import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { useInventory } from '../context/InventoryContext';

const COLORS = ['#7c3aed', '#22d3ee', '#f43f5e', '#f59e0b', '#22c55e', '#e879f9', '#38bdf8'];

const Analytics = () => {
  const { state } = useInventory();

  if (!state) return <div className="page-empty">No data available.</div>;

  // Top 5 items by baseQuantity
  const top5 = [...state.items]
    .sort((a, b) => b.baseQuantity - a.baseQuantity)
    .slice(0, 5)
    .map((item) => ({ name: item.name.length > 14 ? item.name.slice(0, 14) + '…' : item.name, quantity: item.baseQuantity, unit: item.unit }));

  // Category distribution
  const categoryMap = state.items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + item.baseQuantity;
    return acc;
  }, {});
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // Transaction stats
  const txStats = {
    total: state.transactions.length,
    pending: state.transactions.filter((t) => t.status === 'PENDING').length,
    approved: state.transactions.filter((t) => t.status === 'APPROVED').length,
    rejected: state.transactions.filter((t) => t.status === 'REJECTED').length,
  };

  const tooltipStyle = {
    background: 'rgba(15,23,42,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#f8fafc',
  };

  // Historical data processing
  const logs = state.auditLogs || [];
  const processUsageTrends = () => {
    const dailyMap: Record<string, { replenished: number; used: number }> = {};
    logs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      if (!dailyMap[date]) dailyMap[date] = { replenished: 0, used: 0 };
      
      if (log.action === 'STOCK_ADDED') {
        dailyMap[date].replenished += (log.newQuantity - log.previousQuantity);
      } else if (log.action === 'STOCK_USED') {
        dailyMap[date].used += (log.previousQuantity - log.newQuantity);
      }
    });

    return Object.entries(dailyMap).map(([date, data]) => ({
      date,
      replenished: data.replenished,
      used: data.used
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const trendData = processUsageTrends();

  return (
    <div className="analytics-page animate-in">
      <div className="analytics-kpis">
        <div className="kpi-card">
          <span className="kpi-value">{state.items.length}</span>
          <span className="kpi-label">Total SKUs</span>
        </div>
        <div className="kpi-card kpi-card--warning">
          <span className="kpi-value">{state.items.filter(i => i.baseQuantity <= i.alertThreshold).length}</span>
          <span className="kpi-label">Low Stock</span>
        </div>
        <div className="kpi-card kpi-card--pending">
          <span className="kpi-value">{txStats.pending}</span>
          <span className="kpi-label">Pending Tx</span>
        </div>
        <div className="kpi-card kpi-card--success">
          <span className="kpi-value">{txStats.approved}</span>
          <span className="kpi-label">Approved Tx</span>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-card glass-card">
          <h2 className="chart-title">Top 5 Items by Stock</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={top5} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(124,58,237,0.1)' }} />
              <Bar dataKey="quantity" radius={[6, 6, 0, 0]}>
                {top5.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card glass-card">
          <h2 className="chart-title">Stock by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend formatter={(value: string) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analytics-charts" style={{ gridTemplateColumns: '1fr', marginTop: '20px' }}>
        <div className="chart-card glass-card">
          <h2 className="chart-title">Usage & Replenishment Trends</h2>
          {trendData.length === 0 ? (
            <div className="page-empty" style={{ minHeight: '280px' }}>No historical data points available yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="replenished" stroke="#22d3ee" fillOpacity={1} fill="url(#colorRep)" name="Replenished" />
                <Area type="monotone" dataKey="used" stroke="#f43f5e" fillOpacity={1} fill="url(#colorUsed)" name="Used" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
