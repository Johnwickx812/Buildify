import { Gamepad2, Briefcase, Film, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Purpose } from '@/data/pcParts';

interface PurposeSelectionProps {
  selectedPurpose: Purpose | null;
  onSelect: (purpose: Purpose) => void;
}

const purposeConfig: { id: Purpose; icon: React.ElementType; title: string; desc: string }[] = [
  { id: 'Gaming', icon: Gamepad2, title: 'Gaming', desc: 'High FPS, ray tracing, competitive' },
  { id: 'Work', icon: Briefcase, title: 'Work', desc: 'Office, browsing, multitasking' },
  { id: 'Editing', icon: Film, title: 'Editing', desc: 'Video, 3D, creative workloads' },
  { id: 'Budget', icon: PiggyBank, title: 'Budget', desc: 'Best value, everyday use' },
];

export const PurposeSelection = ({ selectedPurpose, onSelect }: PurposeSelectionProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-3">
        What's the <span className="text-gradient">Purpose</span>?
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        We'll optimize your build for your primary use case
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {purposeConfig.map((purpose) => {
          const Icon = purpose.icon;
          return (
            <button
              key={purpose.id}
              onClick={() => onSelect(purpose.id)}
              className={cn(
                'part-card group p-6 text-left',
                selectedPurpose === purpose.id && 'selected'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center transition-colors',
                  selectedPurpose === purpose.id ? 'bg-primary/20' : 'bg-secondary'
                )}>
                  <Icon className={cn(
                    'w-6 h-6 transition-colors',
                    selectedPurpose === purpose.id ? 'text-primary' : 'text-muted-foreground'
                  )} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{purpose.title}</h3>
                  <p className="text-sm text-muted-foreground">{purpose.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
