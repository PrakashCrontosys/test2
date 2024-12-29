import React from 'react';
import { Plus, FileDown } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import type { InvoiceData, InvoiceItem } from '../types/invoice';
import InvoiceItemsTable from './invoice/InvoiceItemsTable';
import InvoiceHeader from './invoice/InvoiceHeader';
import InvoiceTemplate from './invoice/InvoiceTemplate';
import { createEmptyItem, calculateTotalAmount } from '../utils/invoice';

interface Props {
  data: InvoiceData;
  onDataChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onDataChange }: Props) {
  const { toPDF, targetRef } = usePDF({
    filename: `invoice-${data.invoiceNumber || 'draft'}.pdf`,
    page: { margin: 20, format: 'A4' },
  });

  const handleHeaderChange = (field: keyof InvoiceData, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = data.items.map((item, i) => {
      if (i !== index) return item;
      
      const updatedItem = { ...item, [field]: value };
      const sqft = (updatedItem.length || 0) * (updatedItem.width || 0);
      updatedItem.sqft = sqft;
      updatedItem.amount = sqft * (updatedItem.rate || 0);
      
      return updatedItem;
    });

    onDataChange({ ...data, items: newItems });
  };

  const addNewRow = () => {
    const newItem = {
      ...createEmptyItem(),
      srNo: data.items.length + 1,
    };
    onDataChange({ ...data, items: [...data.items, newItem] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.clientName || !data.invoiceNumber || !data.invoiceDate) {
      alert('Please fill in all required fields');
      return;
    }
    await toPDF();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
        <InvoiceHeader data={data} onChange={handleHeaderChange} />
        
        <InvoiceItemsTable
          items={data.items}
          onItemChange={handleItemChange}
          totalAmount={calculateTotalAmount(data.items)}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addNewRow}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Row
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Generate Invoice
          </button>
        </div>
      </form>

      <div style={{ display: 'none' }}>
        <div ref={targetRef}>
          <InvoiceTemplate data={data} />
        </div>
      </div>
    </>
  );
}