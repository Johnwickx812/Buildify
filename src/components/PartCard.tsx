import { cn } from '@/lib/utils';
import type { PCPart } from '@/data/pcParts';
import { Cpu, MonitorSpeaker, MemoryStick, HardDrive, CircuitBoard, Zap, Box, Fan, ExternalLink } from 'lucide-react';
import { formatINR, getIndianStoreLinks } from '@/lib/indianStores';
import { useState } from 'react';

interface PartCardProps {
  part: PCPart;
  isSelected?: boolean;
  onSelect?: () => void;
  compact?: boolean;
}

const categoryIcons: Record<string, React.ElementType> = {
  cpu: Cpu,
  gpu: MonitorSpeaker,
  ram: MemoryStick,
  storage: HardDrive,
  motherboard: CircuitBoard,
  psu: Zap,
  case: Box,
  cooler: Fan,
};

const categoryLabels: Record<string, string> = {
  cpu: 'CPU',
  gpu: 'Graphics Card',
  ram: 'Memory',
  storage: 'Storage',
  motherboard: 'Motherboard',
  psu: 'Power Supply',
  case: 'Case',
  cooler: 'CPU Cooler',
};

export const PartCard = ({ part, isSelected, onSelect, compact }: PartCardProps) => {
  const Icon = categoryIcons[part.category] || Box;
  const [showLinks, setShowLinks] = useState(false);
  const storeLinks = getIndianStoreLinks(part.name);

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{part.name}</p>
          <p className="text-xs text-muted-foreground">{part.brand}</p>
        </div>
        <span className="price-tag text-xs">{formatINR(part.price)}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'part-card p-4 text-left w-full',
        isSelected && 'selected'
      )}
    >
      <button onClick={onSelect} className="w-full text-left">
        <div className="flex items-start gap-3">
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
            isSelected ? 'bg-primary/20' : 'bg-secondary'
          )}>
            <Icon className={cn(
              'w-5 h-5',
              isSelected ? 'text-primary' : 'text-muted-foreground'
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  {categoryLabels[part.category]}
                </p>
                <h4 className="font-semibold text-sm leading-tight">{part.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{part.brand}</p>
              </div>
              <span className="price-tag shrink-0">{formatINR(part.price)}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {Object.entries(part.specs).slice(0, 3).map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>

      {/* Buy Links Toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowLinks(!showLinks); }}
        className="mt-3 text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
      >
        <ExternalLink className="w-3 h-3" />
        {showLinks ? 'Hide prices' : 'Compare prices in India'}
      </button>

      {showLinks && (
        <div className="mt-2 flex flex-wrap gap-2 animate-fade-in">
          {storeLinks.map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'text-xs px-2.5 py-1 rounded-full bg-secondary/80 hover:bg-secondary transition-colors',
                store.color
              )}
            >
              {store.name} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
