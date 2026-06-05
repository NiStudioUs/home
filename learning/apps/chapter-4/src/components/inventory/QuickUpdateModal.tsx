import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { InventoryItem } from '../../types';
import { useInventory } from '../../context/InventoryContext';

interface QuickUpdateModalProps {
  item: InventoryItem;
  open: boolean;
  onClose: () => void;
}

const QuickUpdateModal = ({ item, open, onClose }: QuickUpdateModalProps) => {
  const { quickUpdate, state } = useInventory();
  
  // Calculate total pending change for this specific item
  const pendingDelta = state?.transactions
    .filter(t => t.itemId === item.id && t.status === 'PENDING')
    .reduce((sum, t) => sum + t.changeAmount, 0) || 0;
    
  const effectiveQty = item.baseQuantity + pendingDelta;

  // Prefill the input form with the affective fully-resolved quantity so the user expects what the ultimate output should be
  const [newTotalStr, setNewTotalStr] = useState(String(effectiveQty));
  const [notes, setNotes] = useState('');

  // Re-sync prefill when modal is opened
  React.useEffect(() => {
    if (open) {
      setNewTotalStr(String(effectiveQty));
      setNotes('');
    }
  }, [open, effectiveQty]);

  const newTotalNum = parseInt(newTotalStr, 10);
  const numChange = newTotalNum - item.baseQuantity;
  const isValid = !isNaN(newTotalNum) && numChange !== 0;

  const handleSubmit = () => {
    if (isValid && newTotalNum >= 0) {
      quickUpdate(item.id, numChange, notes || (numChange > 0 ? 'Manual replenishment' : 'Manual stock deduction'));
      onClose();
    }
  };

  const currentQty = item.baseQuantity;
  const newQty = newTotalNum;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="glass-card" style={{ padding: '24px', border: 'none' }}>
        <DialogTitle sx={{ p: 0, mb: 2, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Quick Update: {item.name}
        </DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Database Base Quantity: <strong style={{ color: 'var(--color-text-primary)' }}>{currentQty}</strong>
            {pendingDelta !== 0 && (
              <span style={{ marginLeft: 8, color: pendingDelta > 0 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                (Pending: {pendingDelta > 0 ? '+' : ''}{pendingDelta})
              </span>
            )}
          </div>
          
          <TextField
            autoFocus
            label="New Total Quantity (Prefilled with Pending Math)"
            type="number"
            fullWidth
            value={newTotalStr}
            onChange={(e) => setNewTotalStr(e.target.value)}
            InputProps={{
              sx: { color: 'var(--color-text-primary)' }
            }}
            InputLabelProps={{
              sx: { color: 'var(--color-text-secondary)' }
            }}
          />

          <TextField
            label="Reason / Notes (Optional)"
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            InputProps={{
              sx: { color: 'var(--color-text-primary)' }
            }}
            InputLabelProps={{
              sx: { color: 'var(--color-text-secondary)' }
            }}
          />

          {isValid && (
            <div style={{ padding: '12px', background: 'var(--color-input-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              Projected Final Quantity: <strong style={{ color: newQty < 0 ? '#f43f5e' : '#22d3ee' }}>{isNaN(newQty) ? '--' : newQty}</strong>
              <br/>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                System will log a change of {numChange > 0 ? '+' : ''}{numChange}.
              </span>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 3 }}>
          <Button onClick={onClose} sx={{ color: 'var(--color-text-secondary)' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || newQty < 0}
            variant="contained"
            sx={{
              bgcolor: 'var(--color-accent-1)',
              '&:hover': { bgcolor: '#4f46e5' }
            }}
          >
            Apply Update
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default QuickUpdateModal;
