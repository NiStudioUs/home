import { AppState } from '../types';

export const mockData: AppState = {
  users: [
    { id: 'u1', username: 'admin', password: 'admin123', role: 'ADMIN', name: 'Alex Admin' },
    { id: 'u2', username: 'supervisor', password: 'super123', role: 'SUPERVISOR', name: 'Sam Supervisor' },
    { id: 'u3', username: 'worker', password: 'work123', role: 'WORKER', name: 'Wendy Worker' },
    { id: 'u4', username: 'worker2', password: 'work456', role: 'WORKER', name: 'Will Worker' },
  ],
  items: [
    {
      id: 'item-1',
      name: 'Steel Bolts M8',
      category: 'Fasteners',
      // Nuts and hex bolts, macro
      imageUrl: 'https://images.unsplash.com/photo-1610878180933-123728745d22?w=400&h=300&fit=crop',
      baseQuantity: 5000,
      unit: 'in',
      alertThreshold: 500,
    },
    {
      id: 'item-2',
      name: 'Industrial Oil',
      category: 'Lubricants',
      // Industrial lubricant / motor oil containers
      imageUrl: 'https://images.unsplash.com/photo-1603738549944-1f3ab4f27a71?w=400&h=300&fit=crop',
      baseQuantity: 200,
      unit: 'L',
      alertThreshold: 25,
    },
    {
      id: 'item-3',
      name: 'Safety Gloves',
      category: 'PPE',
      // Protective work gloves yellow
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
      baseQuantity: 350,
      unit: 'in',
      alertThreshold: 50,
    },
    {
      id: 'item-4',
      name: 'Aluminum Sheet 2mm',
      category: 'Raw Materials',
      // Stacked metal/aluminum sheets in warehouse
      imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
      baseQuantity: 1200,
      unit: 'kg',
      alertThreshold: 100,
    },
    {
      id: 'item-5',
      name: 'Hydraulic Fluid',
      category: 'Lubricants',
      // Industrial heavy machinery / hydraulic press
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      baseQuantity: 80,
      unit: 'L',
      alertThreshold: 20,
    },
    {
      id: 'item-6',
      name: 'Hard Hats',
      category: 'PPE',
      // Yellow construction hard hats in a row
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
      baseQuantity: 42,
      unit: 'in',
      alertThreshold: 10,
    },
    {
      id: 'item-7',
      name: 'Copper Wire 2.5mm',
      category: 'Electrical',
      // Electrical wires / cables bundle
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
      baseQuantity: 3500,
      unit: 'g',
      alertThreshold: 500,
    },
    {
      id: 'item-8',
      name: 'Epoxy Adhesive',
      category: 'Chemicals',
      // Industrial chemical drum / epoxy container
      imageUrl: 'https://images.unsplash.com/photo-1616761355697-1f2b1b3a6c48?w=400&h=300&fit=crop',
      baseQuantity: 45,
      unit: 'kg',
      alertThreshold: 5,
    },
    {
      id: 'item-9',
      name: 'PVC Pipes 1in',
      category: 'Plumbing',
      // White PVC pipes in a warehouse/store
      imageUrl: 'https://images.unsplash.com/photo-1558618048-fbd7e964ead4?w=400&h=300&fit=crop',
      baseQuantity: 180,
      unit: 'in',
      alertThreshold: 20,
    },
    {
      id: 'item-10',
      name: 'Acetone Solvent',
      category: 'Chemicals',
      // Chemical containers/solvent bottles in lab/warehouse
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
      baseQuantity: 60,
      unit: 'L',
      alertThreshold: 10,
    },
  ],
  transactions: [
    {
      id: 'tx-1',
      itemId: 'item-1',
      changeAmount: -200,
      requestedByUserId: 'u3',
      requestedByUserName: 'Wendy Worker',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'PENDING',
    },
    {
      id: 'tx-2',
      itemId: 'item-3',
      changeAmount: -30,
      requestedByUserId: 'u4',
      requestedByUserName: 'Will Worker',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'PENDING',
    },
    {
      id: 'tx-3',
      itemId: 'item-2',
      changeAmount: 100,
      requestedByUserId: 'u3',
      requestedByUserName: 'Wendy Worker',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'APPROVED',
    },
  ],
  auditLogs: [
    {
      id: 'log-1',
      itemId: 'item-2',
      action: 'STOCK_ADDED',
      previousQuantity: 100,
      newQuantity: 200,
      performedByUserId: 'u2',
      performedByUserName: 'Sam Supervisor',
      timestamp: new Date(Date.now() - 86400000 * 2.1).toISOString(),
      notes: 'Initial stock delivery',
    },
    {
      id: 'log-2',
      itemId: 'item-2',
      action: 'REQUEST_APPROVED',
      previousQuantity: 100,
      newQuantity: 200,
      performedByUserId: 'u1',
      performedByUserName: 'Alex Admin',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'log-3',
      itemId: 'item-4',
      action: 'STOCK_USED',
      previousQuantity: 1500,
      newQuantity: 1200,
      performedByUserId: 'u3',
      performedByUserName: 'Wendy Worker',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      notes: 'Project Alpha framing',
    },
  ],
  settings: {
    region: 'IN',
  },
};
