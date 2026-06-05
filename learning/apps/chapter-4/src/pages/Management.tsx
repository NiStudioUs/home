import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { InventoryItem, UnitType } from '../types';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const UNITS: UnitType[] = ['kg', 'g', 'L', 'ml', 'pieces', 'lbs', 'oz', 'in'];

const emptyItem: Omit<InventoryItem, 'id'> = {
  name: '',
  category: '',
  imageUrl: '',
  baseQuantity: 0,
  unit: 'in',
  alertThreshold: 10,
};

const Management = () => {
  const { state, addItem, updateItem, deleteItem } = useInventory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState<Omit<InventoryItem, 'id'>>(emptyItem);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (!state) return <div className="page-empty">No data available.</div>;

  const openAdd = () => {
    setEditing(null);
    setForm(emptyItem);
    setDialogOpen(true);
  };

  const openEdit = (item: InventoryItem) => {
    setEditing(item);
    setForm({ ...item });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      updateItem({ ...form, id: editing.id });
    } else {
      addItem(form);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
    setDeleteTarget(null);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: '#f8fafc',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#7c3aed' },
      background: 'rgba(255,255,255,0.03)',
    },
    '& .MuiInputLabel-root': { color: '#64748b' },
    '& .MuiSelect-icon': { color: '#64748b' },
  };

  return (
    <div className="management-page animate-in">
      <div className="management-toolbar">
        <div className="management-count">{state.items.length} items in inventory</div>
        <button className="btn-add-item" onClick={openAdd}>
          <AddIcon sx={{ fontSize: 20 }} /> Add Item
        </button>
      </div>

      <div className="management-table-wrap glass-card">
        <table className="management-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Alert Threshold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item) => (
              <tr key={item.id} className={item.baseQuantity <= item.alertThreshold ? 'row-low' : ''}>
                <td>
                  <div className="mgmt-item-name">{item.name}</div>
                  {item.baseQuantity <= item.alertThreshold && (
                    <span className="low-badge">LOW STOCK</span>
                  )}
                </td>
                <td className="mgmt-category">{item.category}</td>
                <td className="mgmt-qty">{item.baseQuantity.toLocaleString()}</td>
                <td className="mgmt-unit">{item.unit}</td>
                <td className="mgmt-threshold">{item.alertThreshold}</td>
                <td>
                  <div className="mgmt-actions">
                    <button className="mgmt-btn mgmt-btn--edit" onClick={() => openEdit(item)} title="Edit">
                      <EditIcon sx={{ fontSize: 16 }} />
                    </button>
                    <button
                      className="mgmt-btn mgmt-btn--delete"
                      onClick={() => setDeleteTarget(item.id)}
                      title="Delete"
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(15,23,42,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#f8fafc', fontWeight: 700 }}>
          {editing ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth sx={inputSx} />
          <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth sx={inputSx} />
          <TextField label="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} fullWidth sx={inputSx} />
          <TextField label="Quantity" type="number" value={form.baseQuantity} onChange={(e) => setForm({ ...form, baseQuantity: Number(e.target.value) })} fullWidth sx={inputSx} />
          <FormControl fullWidth sx={inputSx}>
            <InputLabel>Unit</InputLabel>
            <Select
              value={form.unit}
              label="Unit"
              onChange={(e) => setForm({ ...form, unit: e.target.value as UnitType })}
              sx={{ color: '#f8fafc' }}
              MenuProps={{ PaperProps: { sx: { background: '#1e293b', color: '#f8fafc' } } }}
            >
              {UNITS.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Alert Threshold" type="number" value={form.alertThreshold} onChange={(e) => setForm({ ...form, alertThreshold: Number(e.target.value) })} fullWidth sx={inputSx} />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: '#94a3b8' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ background: '#7c3aed', '&:hover': { background: '#6d28d9' } }}>
            {editing ? 'Save Changes' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ sx: { background: 'rgba(15,23,42,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3 } }}
      >
        <DialogTitle sx={{ color: '#f8fafc' }}>Delete Item?</DialogTitle>
        <DialogContent>
          <p style={{ color: '#94a3b8' }}>This action cannot be undone. The item will be permanently removed.</p>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)} sx={{ color: '#94a3b8' }}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteTarget!)} sx={{ color: '#f43f5e', background: 'rgba(244,63,94,0.1)' }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Management;
