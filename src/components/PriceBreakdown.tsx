import { Check, AlertTriangle, Cpu, MonitorSpeaker, MemoryStick, HardDrive, CircuitBoard, Zap, Box, Fan, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PCPart, Peripheral } from '@/data/pcParts';

type PartCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler';

interface PriceBreakdownProps {
  parts: Record<string, PCPart>;
  peripherals: Peripheral[];
  compatibility: {
    isCompatible: boolean;
    issues: string[];
  };
  ownedParts?: Set<PartCategory>;
}

const categoryIcons: Record<string, React.ElementType> = {
  cpu: Cpu, gpu: MonitorSpeaker, ram: MemoryStick, storage: HardDrive,
  motherboard: CircuitBoard, psu: Zap, case: Box, cooler: Fan,
};

const categoryLabels: Record<string, string> = {
  cpu: 'CPU', gpu: 'GPU', ram: 'RAM', storage: 'Storage',
  motherboard: 'Motherboard', psu: 'PSU', case: 'Case', cooler: 'Cooler',
};

export const PriceBreakdown = ({ parts, peripherals, compatibility, ownedParts = new Set() }: PriceBreakdownProps) => {
  const partsTotal = Object.entries(parts).reduce((sum, [cat, part]) =>
    sum + (ownedParts.has(cat as PartCategory) ? 0 : part.price), 0);
  const peripheralsTotal = peripherals.reduce((sum, p) => sum + p.price, 0);
  const grandTotal = partsTotal + peripheralsTotal;

  return (
    <div className="gradient-border p-6">
      <h3 className="font-semibold mb-4">Price Breakdown</h3>

      {/* Compatibility Status */}
      <div className={cn(
        'p-3 rounded-lg mb-4',
        compatibility.isCompatible ? 'bg-glow-success/10' : 'bg-glow-warning/10'
      )}>
        <div className="flex items-center gap-2">
          {compatibility.isCompatible ? (
            <><Check className="w-4 h-4 text-glow-success" /><span className="text-sm font-medium text-glow-success">All parts are compatible</span></>
          ) : (
            <><AlertTriangle className="w-4 h-4 text-glow-warning" /><span className="text-sm font-medium text-glow-warning">Compatibility warnings</span></>
          )}
        </div>
        {!compatibility.isCompatible && (
          <ul className="mt-2 space-y-1">
            {compatibility.issues.map((issue, i) => (
              <li key={i} className="text-xs text-muted-foreground">• {issue}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Parts List */}
      <div className="space-y-2 mb-4">
        {Object.entries(parts).map(([category, part]) => {
          const Icon = categoryIcons[category] || Box;
          const isOwned = ownedParts.has(category as PartCategory);
          return (
            <div key={category} className={cn(
              'flex items-center justify-between py-2 border-b border-border/50 last:border-0',
              isOwned && 'opacity-50'
            )}>
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{part.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {categoryLabels[category]}
                    {isOwned && (
                      <span className="ml-2 inline-flex items-center gap-1 text-primary">
                        <PackageCheck className="w-3 h-3" /> Owned
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <span className={cn('font-mono text-sm', isOwned && 'line-through')}>
                ₹{part.price.toLocaleString('en-IN')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Parts Subtotal */}
      <div className="flex justify-between py-2 border-t border-border">
        <span className="font-medium">
          Parts to Buy {ownedParts.size > 0 && `(${8 - ownedParts.size})`}
        </span>
        <span className="font-mono font-semibold">₹{partsTotal.toLocaleString('en-IN')}</span>
      </div>

      {/* Peripherals */}
      {peripherals.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Peripherals</p>
          <div className="space-y-2">
            {peripherals.map((p) => (
              <div key={p.id} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="font-mono">₹{p.price.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2 mt-2 border-t border-border/50">
            <span className="text-sm">Peripherals Subtotal</span>
            <span className="font-mono text-sm">₹{peripheralsTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Grand Total */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-primary/30">
        <span className="text-lg font-bold">Grand Total</span>
        <span className="text-2xl font-bold font-mono text-primary glow-text">
          ₹{grandTotal.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
};
