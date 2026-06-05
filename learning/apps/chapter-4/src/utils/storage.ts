import { AppState } from '../types';

const DB_KEY = 'chapter_4_inventory_db';

export const getDB = (): AppState | null => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveDB = (state: AppState): void => {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
};

export const clearDB = (): void => {
  localStorage.removeItem(DB_KEY);
};
