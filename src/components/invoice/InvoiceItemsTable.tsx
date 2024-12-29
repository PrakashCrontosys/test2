import React from 'react';
import type { InvoiceItem } from '../../types/invoice';
import Input from '../form/Input';

interface Props {
  items: InvoiceItem[];
  onItemChange: (index: number, field: keyof InvoiceItem, value: string | number) => void;
  totalAmount: number;
}

export default function InvoiceItemsTable({ items, onItemChange, totalAmount }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SR NO
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PARTICULAR
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LENGTH
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              WIDTH
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SQFT/RF
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              RATE
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.srNo}</td>
              <td className="px-4 py-2">
                <Input
                  type="text"
                  value={item.particular}
                  onChange={(e) => onItemChange(index, 'particular', e.target.value)}
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  value={item.length || ''}
                  onChange={(e) => onItemChange(index, 'length', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  value={item.width || ''}
                  onChange={(e) => onItemChange(index, 'width', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-4 py-2">{item.sqft.toFixed(2)}</td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  value={item.rate || ''}
                  onChange={(e) => onItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td className="px-4 py-2">{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td colSpan={6} className="text-right px-4 py-2 font-bold">Total:</td>
            <td className="px-4 py-2 font-bold">{totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}