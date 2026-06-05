import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppState, InventoryItem, StockTransaction, AuditLog } from '../types';
import { getDB, saveDB } from '../utils/storage';
import { useAuth } from './AuthContext';

interface InventoryContextType {
  state: AppState | null;
  refreshState: () => void;
  requestTransaction: (itemId: string, changeAmount: number) => void;
  approveTransaction: (transactionId: string) => void;
  rejectTransaction: (transactionId: string) => void;
  quickUpdate: (itemId: string, changeAmount: number, notes: string) => void;
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateItem: (item: InventoryItem) => void;
  deleteItem: (itemId: string) => void;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
};

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [state, setState] = useState<AppState | null>(() => getDB());

  const refreshState = useCallback(() => {
    setState(getDB());
  }, []);

  const INTERNAL_logAction = (
    db: AppState,
    itemId: string,
    action: AuditLog['action'],
    previousQuantity: number,
    newQuantity: number,
    notes?: string
  ) => {
    if (!currentUser) return;
    const log: AuditLog = {
      id: uuidv4(),
      itemId,
      action,
      previousQuantity,
      newQuantity,
      performedByUserId: currentUser.id,
      performedByUserName: currentUser.name,
      timestamp: new Date().toISOString(),
      notes,
    };
    if (!db.auditLogs) db.auditLogs = [];
    db.auditLogs.push(log);
  };

  const requestTransaction = useCallback(
    (itemId: string, changeAmount: number) => {
      if (!currentUser) return;
      const db = getDB();
      if (!db) return;

      const tx: StockTransaction = {
        id: uuidv4(),
        itemId,
        changeAmount,
        requestedByUserId: currentUser.id,
        requestedByUserName: currentUser.name,
        timestamp: new Date().toISOString(),
        status: 'PENDING',
      };

      db.transactions.push(tx);
      saveDB(db);
      setState({ ...db });
    },
    [currentUser]
  );

  const approveTransaction = useCallback((transactionId: string) => {
    const db = getDB();
    if (!db) return;

    const tx = db.transactions.find((t) => t.id === transactionId);
    if (!tx || tx.status !== 'PENDING') return;

    const item = db.items.find((i) => i.id === tx.itemId);
    if (item) {
      const prevQty = item.baseQuantity;
      item.baseQuantity += tx.changeAmount;
      tx.status = 'APPROVED';
      
      INTERNAL_logAction(db, item.id, 'REQUEST_APPROVED', prevQty, item.baseQuantity, `Approved request from ${tx.requestedByUserName}`);
      
      saveDB(db);
      setState({ ...db });
    }
  }, [currentUser]);

  const rejectTransaction = useCallback((transactionId: string) => {
    const db = getDB();
    if (!db) return;

    const tx = db.transactions.find((t) => t.id === transactionId);
    if (!tx || tx.status !== 'PENDING') return;

    const item = db.items.find((i) => i.id === tx.itemId);

    tx.status = 'REJECTED';
    
    if (item) {
      INTERNAL_logAction(db, item.id, 'REQUEST_REJECTED', item.baseQuantity, item.baseQuantity, `Rejected request from ${tx.requestedByUserName} for ${tx.changeAmount}`);
    }

    saveDB(db);
    setState({ ...db });
  }, [currentUser]);

  const quickUpdate = useCallback((itemId: string, changeAmount: number, notes: string) => {
    const db = getDB();
    if (!db) return;
    const item = db.items.find((i) => i.id === itemId);
    if (item) {
      const prevQty = item.baseQuantity;
      item.baseQuantity += changeAmount;
      const actionType = changeAmount > 0 ? 'STOCK_ADDED' : 'STOCK_USED';
      
      INTERNAL_logAction(db, item.id, actionType, prevQty, item.baseQuantity, notes);
      
      saveDB(db);
      setState({ ...db });
    }
  }, [currentUser]);

  const addItem = useCallback((item: Omit<InventoryItem, 'id'>) => {
    const db = getDB();
    if (!db) return;
    const newItem: InventoryItem = { ...item, id: uuidv4() };
    db.items.push(newItem);
    
    INTERNAL_logAction(db, newItem.id, 'CREATED', 0, newItem.baseQuantity, 'Initial item creation');
    
    saveDB(db);
    setState({ ...db });
  }, [currentUser]);

  const updateItem = useCallback((item: InventoryItem) => {
    const db = getDB();
    if (!db) return;
    const idx = db.items.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      const prevQty = db.items[idx].baseQuantity;
      db.items[idx] = item;
      
      if (prevQty !== item.baseQuantity) {
        const actionType = item.baseQuantity > prevQty ? 'STOCK_ADDED' : 'STOCK_USED';
        INTERNAL_logAction(db, item.id, actionType, prevQty, item.baseQuantity, 'Direct management edit');
      } else {
        INTERNAL_logAction(db, item.id, 'UPDATED', prevQty, prevQty, 'Metadata edit');
      }

      saveDB(db);
      setState({ ...db });
    }
  }, [currentUser]);

  const deleteItem = useCallback((itemId: string) => {
    const db = getDB();
    if (!db) return;
    const item = db.items.find(i => i.id === itemId);
    
    if (item) {
      INTERNAL_logAction(db, item.id, 'DELETED', item.baseQuantity, 0, 'Item deleted from system');
    }
    
    db.items = db.items.filter((i) => i.id !== itemId);
    saveDB(db);
    setState({ ...db });
  }, [currentUser]);

  return (
    <InventoryContext.Provider
      value={{
        state,
        refreshState,
        requestTransaction,
        approveTransaction,
        rejectTransaction,
        quickUpdate,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
