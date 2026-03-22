import { useState } from 'react';
import { cn } from '@/lib/utils';
import { budgetRanges, getBudgetTierForAmount, type BudgetRange } from '@/data/pcParts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface BudgetSelectionProps {
  selectedBudget: BudgetRange | null;
  onSelect: (budget: BudgetRange) => void;
  customBudget?: number | null;
  onCustomBudget?: (amount: number) => void;
}

export const BudgetSelection = ({ selectedBudget, onSelect, customBudget, onCustomBudget }: BudgetSelectionProps) => {
  const budgets = Object.entries(budgetRanges) as [BudgetRange, { label: string; min: number; max: number }][];
  const [customAmount, setCustomAmount] = useState(customBudget?.toString() || '');
  const [showCustom, setShowCustom] = useState(false);

  const handleCustomSubmit = () => {
    const amount = parseInt(customAmount);
    if (amount && amount >= 25000) {
      onCustomBudget?.(amount);
      const tier = getBudgetTierForAmount(amount);
      onSelect(tier);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-3">
        Set Your <span className="text-gradient">Budget</span>
      </h2>
      <p className="text-muted-foreground text-center mb-6">
        Choose a price range or enter your exact budget
      </p>

      {/* Custom Budget Input */}
      <div className="max-w-md mx-auto mb-8">
        {!showCustom ? (
          <button
            onClick={() => setShowCustom(true)}
            className="w-full p-3 rounded-lg border border-dashed border-primary/40 text-sm text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Enter exact budget in ₹
          </button>
        ) : (
          <div className="p-4 rounded-lg border border-primary/30 bg-secondary/30 space-y-3">
            <label className="text-sm font-medium">Your Budget (₹)</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">₹</span>
                <Input
                  type="number"
                  min={25000}
                  step={5000}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="e.g. 75000"
                  className="pl-7 font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
                />
              </div>
              <Button onClick={handleCustomSubmit} disabled={!customAmount || parseInt(customAmount) < 25000}>
                Go
              </Button>
            </div>
            {customAmount && parseInt(customAmount) >= 25000 && (
              <p className="text-xs text-muted-foreground">
                We'll fit the best parts within ₹{parseInt(customAmount).toLocaleString('en-IN')}
              </p>
            )}
            {customAmount && parseInt(customAmount) < 25000 && parseInt(customAmount) > 0 && (
              <p className="text-xs text-destructive">Minimum budget is ₹25,000</p>
            )}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {budgets.map(([id, range]) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              'part-card group p-6 text-left',
              selectedBudget === id && 'selected'
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{range.label}</h3>
              {selectedBudget === id && (
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-primary">
                ₹{range.min.toLocaleString('en-IN')}
              </span>
              <span className="text-muted-foreground mx-2">–</span>
              <span className="text-2xl font-bold font-mono text-primary">
                ₹{range.max.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500',
                  selectedBudget === id ? 'w-full' : 'w-0 group-hover:w-1/2'
                )}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
