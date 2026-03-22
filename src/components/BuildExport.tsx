import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PCPart, Peripheral } from '@/data/pcParts';
import { formatINR } from '@/lib/indianStores';

type PartCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler';

const categoryLabels: Record<string, string> = {
  cpu: 'CPU', gpu: 'Graphics Card', ram: 'Memory', storage: 'Storage',
  motherboard: 'Motherboard', psu: 'Power Supply', case: 'Case', cooler: 'CPU Cooler',
};

interface BuildExportProps {
  parts: Record<PartCategory, PCPart>;
  peripherals: Peripheral[];
  ownedParts: Set<PartCategory>;
  brand: string;
  purpose: string;
  budget: string;
}

export const BuildExport = ({ parts, peripherals, ownedParts, brand, purpose, budget }: BuildExportProps) => {
  const partsTotal = Object.entries(parts).reduce(
    (sum, [cat, part]) => sum + (ownedParts.has(cat as PartCategory) ? 0 : part.price), 0
  );
  const peripheralsTotal = peripherals.reduce((s, p) => s + p.price, 0);
  const grandTotal = partsTotal + peripheralsTotal;

  const handleExportPDF = () => {
    const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    const partsRows = (Object.entries(parts) as [PartCategory, PCPart][]).map(([cat, part]) => {
      const isOwned = ownedParts.has(cat);
      return `
        <tr style="border-bottom:1px solid #e2e8f0;${isOwned ? 'opacity:0.5;' : ''}">
          <td style="padding:10px 12px;font-size:13px;color:#64748b">${categoryLabels[cat]}</td>
          <td style="padding:10px 12px;font-size:13px;font-weight:500">${part.name}<br/><span style="font-size:11px;color:#94a3b8">${part.brand}</span></td>
          <td style="padding:10px 12px;font-size:13px;font-family:monospace;color:#7c3aed;font-weight:600;white-space:nowrap">
            ${isOwned ? '<span style="text-decoration:line-through;color:#94a3b8">' + formatINR(part.price) + '</span> <span style="color:#22c55e;font-size:11px">Owned</span>' : formatINR(part.price)}
          </td>
        </tr>`;
    }).join('');

    const peripheralRows = peripherals.map(p => {
      return `
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:10px 12px;font-size:13px;color:#64748b">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</td>
          <td style="padding:10px 12px;font-size:13px;font-weight:500">${p.name}<br/><span style="font-size:11px;color:#94a3b8">${p.brand}</span></td>
          <td style="padding:10px 12px;font-size:13px;font-family:monospace;color:#7c3aed;font-weight:600">${formatINR(p.price)}</td>
        </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Buildify — PC Build Summary</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1e293b; }
    .page { max-width: 900px; margin: 0 auto; padding: 40px 32px; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 44px; height: 44px; background: linear-gradient(135deg, #7c3aed, #3b82f6); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; }
    .logo-name { font-size: 22px; font-weight: 800; color: #7c3aed; }
    .meta { text-align: right; font-size: 12px; color: #94a3b8; line-height: 1.8; }
    .build-info { display: flex; gap: 12px; margin-bottom: 24px; }
    .badge { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .badge-brand { background: #ede9fe; color: #7c3aed; }
    .badge-purpose { background: #dbeafe; color: #2563eb; }
    .badge-budget { background: #dcfce7; color: #16a34a; }
    table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); margin-bottom: 16px; }
    thead tr { background: #1e293b; color: white; }
    thead th { padding: 12px; text-align: left; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    tbody tr:hover { background: #f8fafc; }
    .section-title { font-size: 14px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 8px; }
    .totals { background: white; border-radius: 12px; padding: 20px 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    .total-row:last-child { border-bottom: none; font-size: 20px; font-weight: 800; color: #7c3aed; padding-top: 14px; }
    .footer { margin-top: 32px; text-align: center; font-size: 11px; color: #94a3b8; }
    @media print { body { background: white; } .page { padding: 20px; } }
  </style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="logo">
      <div class="logo-icon">B</div>
      <span class="logo-name">Buildify</span>
    </div>
    <div class="meta">
      PC Build Summary<br/>
      Generated on ${date}<br/>
      Prices in Indian Rupees (INR)
    </div>
  </div>

  <div class="build-info">
    <span class="badge badge-brand">${brand}</span>
    <span class="badge badge-purpose">${purpose}</span>
    <span class="badge badge-budget">${budget.charAt(0).toUpperCase() + budget.slice(1)} Build</span>
  </div>

  <div class="section-title">PC Components</div>
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Component</th>
        <th>Price (INR)</th>
      </tr>
    </thead>
    <tbody>${partsRows}</tbody>
  </table>

  ${peripherals.length > 0 ? `
  <div class="section-title">Peripherals</div>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Product</th>
        <th>Price (INR)</th>
      </tr>
    </thead>
    <tbody>${peripheralRows}</tbody>
  </table>` : ''}

  <div class="totals">
    <div class="total-row">
      <span>Components Total${ownedParts.size > 0 ? ` (${8 - ownedParts.size} to buy)` : ''}</span>
      <span style="font-family:monospace;font-weight:600">${formatINR(partsTotal)}</span>
    </div>
    ${peripherals.length > 0 ? `<div class="total-row"><span>Peripherals</span><span style="font-family:monospace;font-weight:600">${formatINR(peripheralsTotal)}</span></div>` : ''}
    <div class="total-row">
      <span>Grand Total</span>
      <span style="font-family:monospace">${formatINR(grandTotal)}</span>
    </div>
  </div>

  <div class="footer">
    Built with Buildify • Prices are indicative estimates for Indian market (Feb 2026). Check stores for live pricing.
  </div>
</div>
<script>window.onload = () => window.print();</script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.onbeforeunload = () => URL.revokeObjectURL(url);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
      <FileDown className="w-4 h-4" />
      Export PDF
    </Button>
  );
};
