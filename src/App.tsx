import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import type { InvoiceData } from './types/invoice';
import { createEmptyItem } from './utils/invoice';

const initialData: InvoiceData = {
  clientName: '',
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  companyAddress: '',
  siteAddress: '',
  items: [createEmptyItem()],
};

export default function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Invoice Generator</h1>
        <InvoiceForm data={invoiceData} onDataChange={setInvoiceData} />
      </div>
    </div>
  );
}