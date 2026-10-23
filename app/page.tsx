"use client";

import { useState } from "react";
import { InvoiceData, LineItem } from "@/lib/types";
import LineItems from "@/components/LineItems";
import InvoicePreview from "@/components/InvoicePreview";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const today = new Date().toISOString().split("T")[0];

export default function Home() {
  const [data, setData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: today,
    dueDate: today,
    fromName: "",
    fromEmail: "",
    fromAddress: "",
    toName: "",
    toEmail: "",
    toAddress: "",
    items: [
      { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
    ],
    taxRate: 0,
    notes: "",
    currency: "USD",
  });

  const updateField = (field: keyof InvoiceData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${data.invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Invoice Generator</h1>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Invoice Number</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={data.invoiceNumber}
                  onChange={(e) => updateField("invoiceNumber", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={data.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="HKD">HKD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="SGD">SGD</option>
                  <option value="CNY">CNY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={data.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={data.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-700">From</h3>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Your Name / Company"
                  value={data.fromName}
                  onChange={(e) => updateField("fromName", e.target.value)}
                />
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Email"
                  value={data.fromEmail}
                  onChange={(e) => updateField("fromEmail", e.target.value)}
                />
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Address"
                  rows={3}
                  value={data.fromAddress}
                  onChange={(e) => updateField("fromAddress", e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-700">Bill To</h3>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Client Name"
                  value={data.toName}
                  onChange={(e) => updateField("toName", e.target.value)}
                />
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Email"
                  value={data.toEmail}
                  onChange={(e) => updateField("toEmail", e.target.value)}
                />
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Address"
                  rows={3}
                  value={data.toAddress}
                  onChange={(e) => updateField("toAddress", e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Items</h3>
              <LineItems
                items={data.items}
                onChange={(items) => updateField("items", items)}
                currency={data.currency}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={data.taxRate}
                  min={0}
                  onChange={(e) => updateField("taxRate", Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Payment terms, thank you note, etc."
                value={data.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <InvoicePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
