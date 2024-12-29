import React from 'react';
import FormField from '../form/FormField';
import Input from '../form/Input';
import TextArea from '../form/TextArea';
import type { InvoiceData } from '../../types/invoice';

interface Props {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: string) => void;
}

export default function InvoiceHeader({ data, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField label="Client Name" required>
        <Input
          type="text"
          required
          value={data.clientName}
          onChange={(e) => onChange('clientName', e.target.value)}
        />
      </FormField>
      <FormField label="Invoice Number" required>
        <Input
          type="text"
          required
          value={data.invoiceNumber}
          onChange={(e) => onChange('invoiceNumber', e.target.value)}
        />
      </FormField>
      <FormField label="Invoice Date" required>
        <Input
          type="date"
          required
          value={data.invoiceDate}
          onChange={(e) => onChange('invoiceDate', e.target.value)}
        />
      </FormField>
      <FormField label="Company Address" required>
        <TextArea
          required
          value={data.companyAddress}
          onChange={(e) => onChange('companyAddress', e.target.value)}
        />
      </FormField>
      <FormField label="Site Address" required>
        <TextArea
          required
          value={data.siteAddress}
          onChange={(e) => onChange('siteAddress', e.target.value)}
        />
      </FormField>
    </div>
  );
}