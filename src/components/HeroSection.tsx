import { Cpu, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Smart Build Recommendations</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-gradient">Buildify</span>
          <br />
          <span className="text-gradient">Build Your Dream PC</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose your preferences and we'll suggest the perfect parts for your budget.
          Compatible components, optimized performance.
        </p>
        
        <Button size="xl" variant="brand" onClick={onStart} className="group">
          <Cpu className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Start Building
        </Button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
        {[
          { icon: Cpu, title: 'Smart Selection', desc: 'AI-powered part recommendations based on your needs' },
          { icon: Shield, title: 'Compatibility Check', desc: 'Ensure all components work together seamlessly' },
          { icon: Zap, title: 'Price Optimized', desc: 'Get the best performance within your budget' },
        ].map((feature) => (
          <div key={feature.title} className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
