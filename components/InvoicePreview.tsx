"use client";

import { InvoiceData } from "@/lib/types";

interface Props {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: Props) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const tax = subtotal * (data.taxRate / 100);
  const total = subtotal + tax;

  return (
    <div
      id="invoice-preview"
      className="bg-white p-8 shadow-lg rounded-xl border max-w-[800px] mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{data.fromName || "Your Company"}</h1>
          <p className="text-sm text-slate-500 whitespace-pre-line mt-1">
            {data.fromAddress}
          </p>
          <p className="text-sm text-slate-500">{data.fromEmail}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-blue-600">INVOICE</h2>
          <p className="text-sm mt-2">
            <span className="text-slate-500">Invoice #:</span>{" "}
            <span className="font-medium">{data.invoiceNumber}</span>
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Date:</span> {data.date}
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Due:</span> {data.dueDate}
          </p>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Bill To
        </h3>
        <p className="font-semibold text-slate-800">{data.toName || "Client Name"}</p>
        <p className="text-sm text-slate-500 whitespace-pre-line">{data.toAddress}</p>
        <p className="text-sm text-slate-500">{data.toEmail}</p>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-2 text-sm font-semibold text-slate-600">Description</th>
            <th className="text-right py-2 text-sm font-semibold text-slate-600">Qty</th>
            <th className="text-right py-2 text-sm font-semibold text-slate-600">Rate</th>
            <th className="text-right py-2 text-sm font-semibold text-slate-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-100">
              <td className="py-3 text-sm">{item.description || "—"}</td>
              <td className="py-3 text-sm text-right">{item.quantity}</td>
              <td className="py-3 text-sm text-right">
                {data.currency} {item.rate.toFixed(2)}
              </td>
              <td className="py-3 text-sm text-right font-medium">
                {data.currency} {(item.quantity * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span>
              {data.currency} {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Tax ({data.taxRate}%)</span>
            <span>
              {data.currency} {tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-blue-600">
              {data.currency} {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="mt-10 pt-6 border-t">
          <h4 className="text-sm font-semibold text-slate-600 mb-1">Notes</h4>
          <p className="text-sm text-slate-500 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  );
}
