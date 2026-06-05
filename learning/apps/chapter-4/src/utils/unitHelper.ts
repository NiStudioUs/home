import { UnitType } from '../types';

const KG_TO_LBS = 2.20462;
const G_TO_OZ = 0.035274;
const L_TO_GAL = 0.264172;
export const formatUnit = (
  quantity: number,
  unit: UnitType,
  region: 'US' | 'UK' | 'IN'
): string => {
  if (region === 'UK' || region === 'IN') {
    if (unit === 'lbs') return `${(quantity * 0.453592).toFixed(2)} kg`;
    if (unit === 'oz') return `${(quantity * 28.3495).toFixed(2)} g`;
    if (unit === 'in') return `${quantity} in`;
  } else {
    if (unit === 'kg') return `${(quantity * 2.20462).toFixed(2)} lbs`;
    if (unit === 'g') return `${(quantity * 0.035274).toFixed(2)} oz`;
    if (unit === 'in') return `${quantity} in`;
  }
  return `${quantity.toLocaleString()} ${unit}`;
};
