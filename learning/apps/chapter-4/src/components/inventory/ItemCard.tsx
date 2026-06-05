import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useInventory } from '../../context/InventoryContext';
import { formatUnit } from '../../utils/unitHelper';
import QuickUpdateModal from './QuickUpdateModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BoltIcon from '@mui/icons-material/Bolt';

interface ItemCardProps {
  item: InventoryItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { currentUser, region } = useAuth();
  const { requestTransaction, state } = useInventory();
  const [val, setVal] = useState<string>('');
  const [showQuick, setShowQuick] = useState(false);

  const pendingTxs = state?.transactions.filter((t) => t.itemId === item.id && t.status === 'PENDING') || [];
  const myPendingTxs = pendingTxs.filter((t) => t.requestedByUserId === currentUser?.id);
  const totalPendingChange = pendingTxs.reduce((sum, t) => sum + t.changeAmount, 0);

  const canQuickUpdate = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPERVISOR';

  const handleRequest = (type: 'ADD' | 'REMOVE') => {
    const num = parseInt(val, 10);
    if (!num || isNaN(num) || num <= 0) return;
    const amount = type === 'ADD' ? num : -num;
    requestTransaction(item.id, amount);
    setVal('');
  };

  const isLow = item.baseQuantity <= item.alertThreshold;

  return (
    <>
      <div className={`item-card ${isLow ? 'item-card--low' : ''}`}>
        <div className="item-card-image-wrap">
          <img src={item.imageUrl} alt={item.name} loading="lazy" className="item-card-image" />
          {isLow && <div className="item-card-low-badge">LOW STOCK</div>}
        </div>
        <div className="item-card-body">
          <div className="item-card-category">{item.category}</div>
          <div className="item-card-name">{item.name}</div>
          <div className="item-card-quantity">{formatUnit(item.baseQuantity, item.unit, region)}</div>
          
          {totalPendingChange !== 0 && (
            <div className={`item-card-pending ${totalPendingChange > 0 ? 'positive' : 'negative'}`}>
              Pending Queue: {totalPendingChange > 0 ? '+' : ''}{totalPendingChange}
            </div>
          )}
          {myPendingTxs.length > 0 && (
            <div className="item-card-my-pending">You requested: {myPendingTxs.reduce((sum, t) => sum + t.changeAmount, 0)}</div>
          )}
        </div>
        
        <div className="item-card-actions">
          <input
            type="number"
            className="item-card-input"
            placeholder="Qty"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button className="item-btn item-btn--remove" onClick={() => handleRequest('REMOVE')} title="Request Deduction">
            <RemoveIcon fontSize="small" />
          </button>
          <button className="item-btn item-btn--add" onClick={() => handleRequest('ADD')} title="Request Replenishment">
            <AddIcon fontSize="small" />
          </button>
          
          {canQuickUpdate && (
            <button 
              className="item-btn" 
              style={{ background: 'var(--color-warning)', color: '#000', border: 'none' }}
              onClick={() => setShowQuick(true)} 
              title="Quick Update (Admin)"
            >
              <BoltIcon fontSize="small" />
            </button>
          )}
        </div>
      </div>

      <QuickUpdateModal item={item} open={showQuick} onClose={() => setShowQuick(false)} />
    </>
  );
};

export default ItemCard;
