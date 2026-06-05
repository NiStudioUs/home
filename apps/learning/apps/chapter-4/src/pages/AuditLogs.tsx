import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import SearchIcon from '@mui/icons-material/Search';

const ACTION_COLORS: Record<string, { bg: string; color: string }> = {
  STOCK_ADDED:       { bg: 'rgba(34,197,94,0.15)',   color: '#22c55e' },
  STOCK_USED:        { bg: 'rgba(245,158,11,0.15)',  color: '#f59e0b' },
  REQUEST_APPROVED:  { bg: 'rgba(8,145,178,0.15)',   color: '#0891b2' },
  REQUEST_REJECTED:  { bg: 'rgba(244,63,94,0.15)',   color: '#f43f5e' },
  CREATED:           { bg: 'rgba(139,92,246,0.15)',  color: '#8b5cf6' },
  UPDATED:           { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8' },
  DELETED:           { bg: 'rgba(244,63,94,0.18)',   color: '#f43f5e' },
};

const AuditLogs = () => {
  const { state } = useInventory();
  const [search, setSearch] = useState('');
  
  const logs = state?.auditLogs || [];
  
  const sortedLogs = [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const filteredLogs = sortedLogs.filter(log => {
    const item = state?.items.find(i => i.id === log.itemId);
    const searchString = `${item?.name || ''} ${log.action} ${log.performedByUserName}`.toLowerCase();
    return searchString.includes(search.toLowerCase());
  });

  return (
    <div className="audit-page animate-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, whiteSpace: 'nowrap' }}>System Audit Ledger</h2>
        <div className="search-box" style={{ minWidth: '300px' }}>
          <SearchIcon sx={{ color: 'var(--color-text-secondary)' }} fontSize="small" />
          <input
            type="text"
            className="search-input"
            placeholder="Search logs by item, action, or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card approvals-table-wrap">
        <table className="approvals-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Item</th>
              <th>User</th>
              <th style={{ textAlign: 'right' }}>Prev Qty</th>
              <th style={{ textAlign: 'right' }}>New Qty</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
               <tr>
                 <td colSpan={7} className="page-empty" style={{ padding: '40px' }}>No audit records found.</td>
               </tr>
            ) : (
              filteredLogs.map(log => {
                 const item = state?.items.find(i => i.id === log.itemId);
                 const actionStyle = ACTION_COLORS[log.action] ?? { bg: 'var(--color-input-bg)', color: 'var(--color-text-primary)' };
                 return (
                   <tr key={log.id} className="approvals-row">
                     <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                       {new Date(log.timestamp).toLocaleString()}
                     </td>
                     <td>
                       <span style={{
                         fontSize: '0.7rem',
                         fontWeight: 700,
                         padding: '3px 10px',
                         borderRadius: '20px',
                         background: actionStyle.bg,
                         color: actionStyle.color,
                         whiteSpace: 'nowrap',
                         display: 'inline-block',
                         letterSpacing: '0.04em',
                         textTransform: 'uppercase',
                       }}>
                         {log.action.replace(/_/g, ' ')}
                       </span>
                     </td>
                     <td style={{ fontWeight: 600 }}>{item?.name || 'Unknown Item'}</td>
                     <td><span className="user-pill">{log.performedByUserName}</span></td>
                     <td style={{ textAlign: 'right', color: 'var(--color-text-secondary)' }}>{log.previousQuantity}</td>
                     <td style={{ textAlign: 'right', fontWeight: 700 }}>{log.newQuantity}</td>
                     <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{log.notes || '-'}</td>
                   </tr>
                 );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
