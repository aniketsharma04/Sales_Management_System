import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AgeRangeFilterProps {
  value: [number, number] | null;
  onChange: (range: [number, number] | null) => void;
  min: number;
  max: number;
}

export const AgeRangeFilter = ({ value, onChange, min, max }: AgeRangeFilterProps) => {
  const [open, setOpen] = useState(false);
  const [localRange, setLocalRange] = useState<[number, number]>(value || [min, max]);

  const handleSliderChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setLocalRange(newRange);
    onChange(newRange);
  };

  const clearSelection = () => {
    setLocalRange([min, max]);
    onChange(null);
    setOpen(false);
  };

  const hasSelection = value !== null && (value[0] !== min || value[1] !== max);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-sm font-normal border-border bg-card hover:bg-muted",
            hasSelection && "border-primary/50 bg-primary/5"
          )}
        >
          Age Range
          {hasSelection && (
            <span className="ml-1 text-xs text-primary">
              {value[0]}-{value[1]}
            </span>
          )}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-popover border-border" align="start">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">Age Range</span>
          {hasSelection && (
            <button
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="px-2 py-1 bg-muted rounded text-foreground">{localRange[0]}</span>
            <span className="text-muted-foreground">to</span>
            <span className="px-2 py-1 bg-muted rounded text-foreground">{localRange[1]}</span>
          </div>
          <Slider
            value={localRange}
            onValueChange={handleSliderChange}
            min={min}
            max={max}
            step={1}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
