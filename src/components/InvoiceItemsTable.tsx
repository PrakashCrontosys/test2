import React from 'react';
import type { InvoiceItem } from '../types/invoice';

interface Props {
  items: InvoiceItem[];
  onItemChange: (index: number, field: keyof InvoiceItem, value: string | number) => void;
  totalAmount: number;
}

export default function InvoiceItemsTable({ items, onItemChange, totalAmount }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">SR NO</th>
            <th className="px-4 py-2">PARTICULAR</th>
            <th className="px-4 py-2">LENGTH</th>
            <th className="px-4 py-2">WIDTH</th>
            <th className="px-4 py-2">SQFT/RF</th>
            <th className="px-4 py-2">RATE</th>
            <th className="px-4 py-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.srNo}</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={item.particular}
                  onChange={(e) => onItemChange(index, 'particular', e.target.value)}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={item.length || ''}
                  onChange={(e) => onItemChange(index, 'length', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={item.width || ''}
                  onChange={(e) => onItemChange(index, 'width', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-4 py-2">{item.sqft.toFixed(2)}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={item.rate || ''}
                  onChange={(e) => onItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-4 py-2">{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="text-right px-4 py-2 font-bold">Total:</td>
            <td className="px-4 py-2 font-bold">{totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}