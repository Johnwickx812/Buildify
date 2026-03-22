import { cn } from '@/lib/utils';
import type { Brand } from '@/data/pcParts';

interface BrandSelectionProps {
  selectedBrand: Brand | null;
  onSelect: (brand: Brand) => void;
}

export const BrandSelection = ({ selectedBrand, onSelect }: BrandSelectionProps) => {
  const brands: { id: Brand; name: string; tagline: string }[] = [
    { id: 'AMD', name: 'AMD', tagline: 'Ryzen Power' },
    { id: 'Intel', name: 'Intel', tagline: 'Core Performance' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-3">
        Choose Your <span className="text-gradient">CPU Brand</span>
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Select the processor platform for your build
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => onSelect(brand.id)}
            className={cn(
              'part-card group p-8 text-left',
              selectedBrand === brand.id && 'selected'
            )}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{brand.name[0]}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{brand.name}</h3>
                <p className="text-muted-foreground text-sm">{brand.tagline}</p>
              </div>
            </div>
            <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500 rounded-full" />
          </button>
        ))}
      </div>
    </div>
  );
};
