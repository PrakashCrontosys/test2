import type { InvoiceItem } from '../types/invoice';

export function createEmptyItem(): InvoiceItem {
  return {
    id: crypto.randomUUID(),
    srNo: 1,
    particular: '',
    length: 0,
    width: 0,
    sqft: 0,
    rate: 0,
    amount: 0,
  };
}

export function calculateItemAmount(item: InvoiceItem): number {
  const sqft = (item.length || 0) * (item.width || 0);
  return sqft * (item.rate || 0);
}

export function calculateTotalAmount(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}