import { Monitor, Keyboard, Mouse, Headphones, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { peripherals, type Peripheral } from '@/data/pcParts';

interface PeripheralsSelectorProps {
  selectedPeripherals: Peripheral[];
  onToggle: (peripheral: Peripheral) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  monitor: Monitor,
  keyboard: Keyboard,
  mouse: Mouse,
  headset: Headphones,
};

const categoryLabels: Record<string, string> = {
  monitor: 'Monitors',
  keyboard: 'Keyboards',
  mouse: 'Mice',
  headset: 'Headsets',
};

export const PeripheralsSelector = ({ selectedPeripherals, onToggle }: PeripheralsSelectorProps) => {
  const categories = ['monitor', 'keyboard', 'mouse', 'headset'] as const;

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const categoryItems = peripherals.filter((p) => p.category === category);

        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{categoryLabels[category]}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...categoryItems].sort((a, b) => a.price - b.price).map((item) => {
                const isSelected = selectedPeripherals.some((p) => p.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggle(item)}
                    className={cn(
                      'part-card p-4 text-left',
                      isSelected && 'selected'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {Object.entries(item.specs).slice(0, 2).map(([key, value]) => (
                        <span
                          key={key}
                          className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                    <span className="price-tag">₹{item.price.toLocaleString('en-IN')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
