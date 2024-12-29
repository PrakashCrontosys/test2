export interface InvoiceItem {
  id: string;
  srNo: number;
  particular: string;
  length: number;
  width: number;
  sqft: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  companyAddress: string;
  siteAddress: string;
  items: InvoiceItem[];
}