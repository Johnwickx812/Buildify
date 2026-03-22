import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { BuildExport } from './BuildExport';
import { PartCard } from './PartCard';
import { PeripheralsSelector } from './PeripheralsSelector';
import { PriceBreakdown } from './PriceBreakdown';
import { Check, AlertTriangle, ChevronRight, RotateCcw, ChevronDown, Sparkles, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  type Brand,
  type Purpose,
  type BudgetRange,
  type PCPart,
  type Peripheral,
  cpuData,
  gpuData,
  ramData,
  storageData,
  motherboardData,
  psuData,
  caseData,
  coolerData,
} from '@/data/pcParts';

interface PartsBuilderProps {
  brand: Brand;
  purpose: Purpose;
  budget: BudgetRange;
  onReset: () => void;
}

type PartCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler';

const categoryLabels: Record<PartCategory, string> = {
  cpu: 'CPU', gpu: 'GPU', ram: 'RAM', storage: 'Storage',
  motherboard: 'Motherboard', psu: 'PSU', case: 'Case', cooler: 'Cooler',
};

const getAllAlternatives = (brand: Brand, purpose: Purpose): Record<PartCategory, PCPart[]> => {
  const budgets: BudgetRange[] = ['budget', 'mid', 'high', 'extreme'];
  return {
    cpu: budgets.map(b => cpuData[brand][b]),
    gpu: budgets.map(b => gpuData[purpose][b]),
    ram: budgets.map(b => ramData[b]),
    storage: budgets.map(b => storageData[b]),
    motherboard: budgets.map(b => motherboardData[brand][b]),
    psu: budgets.map(b => psuData[b]),
    case: budgets.map(b => caseData[b]),
    cooler: budgets.map(b => coolerData[b]),
  };
};

export const PartsBuilder = ({ brand, purpose, budget, onReset }: PartsBuilderProps) => {
  const suggestedParts = useMemo(() => ({
    cpu: cpuData[brand][budget],
    gpu: gpuData[purpose][budget],
    ram: ramData[budget],
    storage: storageData[budget],
    motherboard: motherboardData[brand][budget],
    psu: psuData[budget],
    case: caseData[budget],
    cooler: coolerData[budget],
  }), [brand, purpose, budget]);

  const alternatives = useMemo(() => getAllAlternatives(brand, purpose), [brand, purpose]);

  const [selectedParts, setSelectedParts] = useState<Record<PartCategory, PCPart>>(suggestedParts);
  const [selectedPeripherals, setSelectedPeripherals] = useState<Peripheral[]>([]);
  const [showPeripherals, setShowPeripherals] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<PartCategory | null>(null);
  const [ownedParts, setOwnedParts] = useState<Set<PartCategory>>(new Set());

  const toggleOwned = (category: PartCategory) => {
    setOwnedParts(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const partsTotal = useMemo(() =>
    Object.entries(selectedParts).reduce((sum, [cat, part]) =>
      sum + (ownedParts.has(cat as PartCategory) ? 0 : part.price), 0),
    [selectedParts, ownedParts]
  );

  const peripheralsTotal = useMemo(() =>
    selectedPeripherals.reduce((sum, p) => sum + p.price, 0),
    [selectedPeripherals]
  );

  const totalPrice = partsTotal + peripheralsTotal;

  const compatibility = useMemo(() => {
    const issues: string[] = [];
    if (!ownedParts.has('gpu') && !ownedParts.has('psu')) {
      const gpuPower = selectedParts.gpu.price > 80000 ? 350 : selectedParts.gpu.price > 40000 ? 250 : 150;
      const cpuPower = selectedParts.cpu.price > 30000 ? 125 : 65;
      const estimatedPower = gpuPower + cpuPower + 100;
      const psuWattage = parseInt(selectedParts.psu.specs.wattage);
      if (psuWattage < estimatedPower) {
        issues.push(`PSU may be underpowered (${psuWattage}W for ~${estimatedPower}W system)`);
      }
    }
    return { isCompatible: issues.length === 0, issues };
  }, [selectedParts, ownedParts]);

  const handleSwapPart = (category: PartCategory, part: PCPart) => {
    setSelectedParts(prev => ({ ...prev, [category]: part }));
    setExpandedCategory(null);
  };

  const handleTogglePeripheral = (peripheral: Peripheral) => {
    setSelectedPeripherals(prev => {
      const exists = prev.find(p => p.id === peripheral.id);
      if (exists) return prev.filter(p => p.id !== peripheral.id);
      return [...prev, peripheral];
    });
  };

  if (showPeripherals) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Add Peripherals</h2>
            <p className="text-muted-foreground">Optional accessories for your setup</p>
          </div>
          <Button variant="outline" onClick={() => setShowPeripherals(false)}>
            Back to Parts
          </Button>
        </div>
        <PeripheralsSelector selectedPeripherals={selectedPeripherals} onToggle={handleTogglePeripheral} />
        <div className="mt-8">
          <PriceBreakdown parts={selectedParts} peripherals={selectedPeripherals} compatibility={compatibility} ownedParts={ownedParts} />
        </div>
        <div className="mt-4 flex justify-end">
          <BuildExport
            parts={selectedParts}
            peripherals={selectedPeripherals}
            ownedParts={ownedParts}
            brand={brand}
            purpose={purpose}
            budget={budget}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Your <span className="text-gradient">Build</span>
          </h2>
          <p className="text-muted-foreground">
            {brand} • {purpose} • {budget.charAt(0).toUpperCase() + budget.slice(1)}
          </p>
        </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>

      {/* Compatibility Badge */}
      <div className={cn(
        'compatibility-badge mb-4',
        compatibility.isCompatible ? 'compatible' : 'warning'
      )}>
        {compatibility.isCompatible ? (
          <><Check className="w-3.5 h-3.5" />All parts compatible</>
        ) : (
          <><AlertTriangle className="w-3.5 h-3.5" />{compatibility.issues[0]}</>
        )}
      </div>

      {/* Already own hint */}
      {ownedParts.size > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm flex items-center gap-2">
          <PackageCheck className="w-4 h-4 text-primary shrink-0" />
          <span>
            {ownedParts.size} part{ownedParts.size > 1 ? 's' : ''} marked as owned — excluded from total price
          </span>
        </div>
      )}

      {/* Customize hint */}
      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-primary" />
        Click any part to swap • Use ✓ to mark parts you already own
      </p>

      {/* Parts Grid with Swap & Own Toggle */}
      <div className="grid md:grid-cols-2 gap-3 mb-8">
        {(Object.entries(selectedParts) as [PartCategory, PCPart][]).map(([category, part]) => (
          <div key={category}>
            <div className="relative">
              {/* Own toggle button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleOwned(category); }}
                  className={cn(
                    'absolute top-3 left-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all border',
                    ownedParts.has(category)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary/80 text-muted-foreground border-border hover:border-primary/50'
                  )}
                  title={ownedParts.has(category) ? 'Remove from owned' : 'I already have this'}
                >
                  {ownedParts.has(category) ? '✓' : '−'}
                </button>

              <div
                className={cn(
                  'cursor-pointer',
                  ownedParts.has(category) && 'opacity-50'
                )}
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              >
                <PartCard part={part} isSelected />
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center">
                  <ChevronDown className={cn(
                    'w-3.5 h-3.5 text-muted-foreground transition-transform',
                    expandedCategory === category && 'rotate-180'
                  )} />
                </div>
              </div>

              {ownedParts.has(category) && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
                  Already Owned
                </div>
              )}
            </div>

            {/* Alternatives dropdown */}
            {expandedCategory === category && (
              <div className="mt-1 p-2 bg-secondary/30 rounded-lg border border-border/50 space-y-1 animate-fade-in">
                <p className="text-xs text-muted-foreground px-2 py-1">Swap with:</p>
                {alternatives[category]
                  .filter(alt => alt.id !== part.id)
                  .map(alt => (
                    <button
                      key={alt.id}
                      onClick={() => handleSwapPart(category, alt)}
                      className="w-full text-left p-2 rounded-md hover:bg-secondary/50 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.brand}</p>
                      </div>
                      <span className="price-tag text-xs">₹{alt.price.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="gradient-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {ownedParts.size > 0 ? `Parts Total (${8 - ownedParts.size} to buy)` : 'Parts Total'}
            </p>
            <p className="text-3xl font-bold font-mono">₹{partsTotal.toLocaleString('en-IN')}</p>
          </div>
          <Button size="lg" onClick={() => setShowPeripherals(true)}>
            Add Peripherals
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {selectedPeripherals.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Peripherals ({selectedPeripherals.length})</span>
              <span className="font-mono">₹{peripheralsTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Grand Total</span>
              <span className="text-primary font-mono text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
