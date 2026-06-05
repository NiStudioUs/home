import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/inventory/ItemCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { state } = useInventory();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  if (!state) return (
    <div className="page-empty">
      <p>No data loaded. Please log out and load mock data first.</p>
    </div>
  );

  const categories = ['All', ...Array.from(new Set(state.items.map((i) => i.category)))];

  const filteredItems = state.items.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());
    if (category === 'LOW_STOCK') {
      return matchName && item.baseQuantity <= item.alertThreshold;
    }
    const matchCat = category === 'All' || item.category === category;
    return matchName && matchCat;
  });

  const pendingCount = state.transactions.filter((t) => t.status === 'PENDING').length;
  const lowStockCount = state.items.filter((i) => i.baseQuantity <= i.alertThreshold).length;

  return (
    <div className="dashboard-page animate-in">
      {/* Stats row */}
      <div className="dashboard-stats">
        <div className="stat-card" onClick={() => setCategory('All')}>
          <span className="stat-num">{state.items.length}</span>
          <span className="stat-label">Total SKUs</span>
        </div>
        <div className="stat-card stat-card--warning" onClick={() => setCategory('LOW_STOCK')}>
          <span className="stat-num">{lowStockCount}</span>
          <span className="stat-label">Low Stock</span>
        </div>
        {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPERVISOR') && (
          <div className="stat-card stat-card--pending" onClick={() => navigate('/approvals')}>
            <span className="stat-num">{pendingCount}</span>
            <span className="stat-label">Pending Approvals</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="dashboard-filters">
        <div className="search-box">
          <SearchIcon sx={{ color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          <FilterListIcon sx={{ color: '#64748b', flexShrink: 0 }} />
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items grid */}
      {filteredItems.length === 0 ? (
        <div className="page-empty">No items match your search.</div>
      ) : (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
