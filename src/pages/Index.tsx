import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/StepIndicator';
import { HeroSection } from '@/components/HeroSection';
import { BrandSelection } from '@/components/BrandSelection';
import { PurposeSelection } from '@/components/PurposeSelection';
import { BudgetSelection } from '@/components/BudgetSelection';
import { PartsBuilder } from '@/components/PartsBuilder';
import { ChatBot } from '@/components/ChatBot';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Brand, Purpose, BudgetRange } from '@/data/pcParts';

const steps = [
  { id: 1, label: 'Brand' },
  { id: 2, label: 'Purpose' },
  { id: 3, label: 'Budget' },
  { id: 4, label: 'Parts' },
];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | null>(null);
  const [customBudgetAmount, setCustomBudgetAmount] = useState<number | null>(null);

  const handleReset = () => {
    setStarted(false);
    setCurrentStep(1);
    setSelectedBrand(null);
    setSelectedPurpose(null);
    setSelectedBudget(null);
    setCustomBudgetAmount(null);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedBrand !== null;
      case 2: return selectedPurpose !== null;
      case 3: return selectedBudget !== null;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">PC</span>
              </div>
              <span className="text-xl font-bold">Buildify</span>
            </div>
          </header>

          <HeroSection onStart={() => setStarted(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PC</span>
            </div>
            <span className="text-xl font-bold">Buildify</span>
          </div>
          <Button variant="ghost" onClick={handleReset}>
            Start Over
          </Button>
        </header>

        {/* Step Indicator */}
        {currentStep < 4 && <StepIndicator steps={steps} currentStep={currentStep} />}

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <BrandSelection
              selectedBrand={selectedBrand}
              onSelect={(brand) => {
                setSelectedBrand(brand);
                setTimeout(() => setCurrentStep(2), 300);
              }}
            />
          )}
          {currentStep === 2 && (
            <PurposeSelection
              selectedPurpose={selectedPurpose}
              onSelect={(purpose) => {
                setSelectedPurpose(purpose);
                setTimeout(() => setCurrentStep(3), 300);
              }}
            />
          )}
          {currentStep === 3 && (
            <BudgetSelection
              selectedBudget={selectedBudget}
              customBudget={customBudgetAmount}
              onCustomBudget={setCustomBudgetAmount}
              onSelect={(budget) => {
                setSelectedBudget(budget);
                setTimeout(() => setCurrentStep(4), 300);
              }}
            />
          )}
          {currentStep === 4 && selectedBrand && selectedPurpose && selectedBudget && (
            <PartsBuilder
              brand={selectedBrand}
              purpose={selectedPurpose}
              budget={selectedBudget}
              onReset={handleReset}
            />
          )}
        </div>

        {/* AI Chat Bot */}
        <ChatBot
          buildContext={
            currentStep === 4 && selectedBrand && selectedPurpose && selectedBudget
              ? { brand: selectedBrand, purpose: selectedPurpose, budget: selectedBudget, parts: {} }
              : undefined
          }
        />

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
