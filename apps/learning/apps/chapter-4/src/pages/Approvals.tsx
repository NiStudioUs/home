import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import TransactionModal from '../components/inventory/TransactionModal';
import { StockTransaction } from '../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FilterListIcon from '@mui/icons-material/FilterList';

const statusFilters = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const;
type StatusFilter = typeof statusFilters[number];

const Approvals = () => {
  const { state, approveTransaction, rejectTransaction } = useInventory();
  const [selectedTx, setSelectedTx] = useState<StockTransaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('PENDING');

  if (!state) return <div className="page-empty">No data available.</div>;

  const filteredTxs = [...state.transactions]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .filter((t) => statusFilter === 'ALL' || t.status === statusFilter);

  const getItem = (itemId: string) => state.items.find((i) => i.id === itemId);

  const handleAction = (tx: StockTransaction) => {
    setSelectedTx(tx);
    setModalOpen(true);
  };

  const statusIcon = {
    PENDING: <ScheduleIcon sx={{ fontSize: 16, color: '#f59e0b' }} />,
    APPROVED: <CheckCircleIcon sx={{ fontSize: 16, color: '#22d3ee' }} />,
    REJECTED: <CancelIcon sx={{ fontSize: 16, color: '#f43f5e' }} />,
  };

  const counts = {
    ALL: state.transactions.length,
    PENDING: state.transactions.filter((t) => t.status === 'PENDING').length,
    APPROVED: state.transactions.filter((t) => t.status === 'APPROVED').length,
    REJECTED: state.transactions.filter((t) => t.status === 'REJECTED').length,
  };

  return (
    <div className="approvals-page animate-in">
      <div className="approvals-filter-bar">
        <FilterListIcon sx={{ color: '#64748b' }} />
        {statusFilters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${statusFilter === f ? 'active' : ''}`}
            onClick={() => setStatusFilter(f)}
          >
            {f} <span className="filter-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="approvals-table-wrap glass-card">
        <table className="approvals-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Requester</th>
              <th>Current Qty</th>
              <th>Requested Change</th>
              <th>Projected Qty</th>
              <th>Time (Local)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxs.length === 0 ? (
              <tr>
                <td colSpan={8} className="table-empty">No transactions found.</td>
              </tr>
            ) : (
              filteredTxs.map((tx) => {
                const item = getItem(tx.itemId);
                const isPositive = tx.changeAmount > 0;
                const projected = (item?.baseQuantity ?? 0) + tx.changeAmount;
                return (
                  <tr key={tx.id} className="approvals-row">
                    <td>
                      <div className="tx-item-name">{item?.name ?? 'Unknown Item'}</div>
                      <div className="tx-item-cat">{item?.category}</div>
                    </td>
                    <td className="tx-requester">{tx.requestedByUserName}</td>
                    <td>{item?.baseQuantity ?? 0}</td>
                    <td>
                      <span className={`tx-change ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? '+' : ''}{tx.changeAmount} {item?.unit}
                      </span>
                    </td>
                    <td style={{ color: projected < 0 ? 'var(--color-error)' : 'inherit' }}>
                      <strong>{projected}</strong>
                    </td>
                    <td className="tx-time">
                      {new Date(tx.timestamp).toLocaleDateString()}{' '}
                      {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>
                      <span className={`tx-status tx-status--${tx.status.toLowerCase()}`}>
                        {statusIcon[tx.status]} {tx.status}
                      </span>
                    </td>
                    <td>
                      {tx.status === 'PENDING' && (
                        <button
                          className="btn-review"
                          onClick={() => handleAction(tx)}
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal
        transaction={selectedTx}
        item={selectedTx ? getItem(selectedTx.itemId) : undefined}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onApprove={approveTransaction}
        onReject={rejectTransaction}
      />
    </div>
  );
};

export default Approvals;
