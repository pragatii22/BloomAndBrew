import { Check } from "lucide-react";

// steps: [{ key, label }]  currentKey: active step key
const StepIndicator = ({ steps, currentKey }) => {
  const currentIndex = steps.findIndex((s) => s.key === currentKey);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.key} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border
                  ${done ? "bg-primary border-primary text-navy" : active ? "bg-navy border-navy text-white" : "bg-white border-border text-muted"}`}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs sm:text-sm font-semibold hidden sm:inline ${active ? "text-heading" : "text-muted"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 sm:w-12 h-0.5 rounded ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
