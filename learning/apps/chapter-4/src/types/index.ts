export type Role = 'ADMIN' | 'SUPERVISOR' | 'WORKER';

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
  name: string;
}

export type UnitType = 'kg' | 'g' | 'L' | 'ml' | 'pieces' | 'lbs' | 'oz' | 'in';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  baseQuantity: number;
  unit: UnitType;
  alertThreshold: number;
}

export type TransactionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface StockTransaction {
  id: string;
  itemId: string;
  changeAmount: number;
  requestedByUserId: string;
  requestedByUserName: string;
  timestamp: string;
  status: TransactionStatus;
}

export interface AuditLog {
  id: string;
  itemId: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'STOCK_ADDED' | 'STOCK_USED' | 'REQUEST_APPROVED' | 'REQUEST_REJECTED';
  previousQuantity: number;
  newQuantity: number;
  performedByUserId: string;
  performedByUserName: string;
  timestamp: string;
  notes?: string;
}

export interface AppState {
  users: User[];
  items: InventoryItem[];
  transactions: StockTransaction[];
  auditLogs: AuditLog[];
  settings: {
    region: 'US' | 'UK' | 'IN';
  };
}
