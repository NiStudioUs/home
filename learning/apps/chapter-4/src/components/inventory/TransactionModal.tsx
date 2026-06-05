import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { StockTransaction, InventoryItem } from '../../types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface TransactionModalProps {
  transaction: StockTransaction | null;
  item: InventoryItem | undefined;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const TransactionModal = ({
  transaction,
  item,
  open,
  onClose,
  onApprove,
  onReject,
}: TransactionModalProps) => {
  if (!transaction || !item) return null;

  const isAdd = transaction.changeAmount > 0;
  const currentQty = item.baseQuantity;
  const projectedQty = currentQty + transaction.changeAmount;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'var(--color-surface-alpha)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--color-border)',
          borderRadius: 3,
          minWidth: 380,
          color: 'var(--color-text-primary)'
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        Review Transaction: {item.name}
      </DialogTitle>
      <DialogContent sx={{ p: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Requested by <strong>{transaction.requestedByUserName}</strong> on{' '}
          {new Date(transaction.timestamp).toLocaleString()}
        </p>
        
        <div style={{
          background: 'var(--color-input-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Current Quantity:</span>
            <strong style={{ color: 'var(--color-text-primary)' }}>{currentQty}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Requested Change:</span>
            <strong className={isAdd ? 'tx-change positive' : 'tx-change negative'}>
              {isAdd ? '+' : ''}{transaction.changeAmount}
            </strong>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Projected Quantity:</span>
            <strong style={{ color: projectedQty < 0 ? 'var(--color-error)' : 'var(--color-success)', fontSize: '1.1rem' }}>
              {projectedQty}
            </strong>
          </div>
        </div>

        {projectedQty < 0 && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            color: 'var(--color-warning)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}>
            <strong>Warning:</strong> This approval will result in a negative stock quantity.
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: 'var(--color-text-secondary)',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => { onReject(transaction.id); onClose(); }}
          startIcon={<CancelIcon />}
          sx={{
            background: 'rgba(244,63,94,0.15)',
            color: 'var(--color-error)',
            border: '1px solid rgba(244,63,94,0.3)',
            '&:hover': { background: 'rgba(244,63,94,0.25)' },
          }}
        >
          Reject
        </Button>
        <Button
          onClick={() => { onApprove(transaction.id); onClose(); }}
          disabled={projectedQty < 0}
          startIcon={<CheckCircleIcon />}
          sx={{
            background: 'rgba(34,197,94,0.15)',
            color: 'var(--color-success)',
            border: '1px solid rgba(34,197,94,0.3)',
            '&:hover': { background: 'rgba(34,197,94,0.25)' },
          }}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;
