import React from 'react';
import type { InvoiceData } from '../types/invoice';

interface Props {
  data: InvoiceData;
}

export default function InvoiceTemplate({ data }: Props) {
  const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div id="invoice-template" className="p-8 max-w-4xl mx-auto bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">INVOICE</h1>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-bold mb-2">Bill To:</h2>
          <p>{data.clientName}</p>
          <p className="whitespace-pre-line">{data.siteAddress}</p>
        </div>
        <div className="text-right">
          <p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
          <p><strong>Date:</strong> {data.invoiceDate}</p>
          <p><strong>PAN:</strong> DYHPK1525E</p>
          <p><strong>Mobile:</strong> 8401746930</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-2">From:</h2>
        <p>DINESH SUTHAR</p>
        <p className="whitespace-pre-line">{data.companyAddress}</p>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">SR NO</th>
            <th className="border px-4 py-2">PARTICULAR</th>
            <th className="border px-4 py-2">LENGTH</th>
            <th className="border px-4 py-2">WIDTH</th>
            <th className="border px-4 py-2">SQFT/RF</th>
            <th className="border px-4 py-2">RATE</th>
            <th className="border px-4 py-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.srNo}</td>
              <td className="border px-4 py-2">{item.particular}</td>
              <td className="border px-4 py-2">{item.length}</td>
              <td className="border px-4 py-2">{item.width}</td>
              <td className="border px-4 py-2">{item.sqft.toFixed(2)}</td>
              <td className="border px-4 py-2">{item.rate}</td>
              <td className="border px-4 py-2">{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="border px-4 py-2 text-right font-bold">Total Amount:</td>
            <td className="border px-4 py-2 font-bold">{totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-16 text-center">
        <p className="font-bold">Thank you for your business!</p>
      </div>
    </div>
  );
}