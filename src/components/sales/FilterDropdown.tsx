import { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const FilterDropdown = ({ 
  label, 
  options, 
  selected, 
  onChange 
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const clearSelection = () => {
    onChange([]);
    setOpen(false);
  };

  const hasSelection = selected.length > 0;

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
          {label}
          {hasSelection && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">
              {selected.length}
            </span>
          )}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-52 p-2 bg-popover border-border" 
        align="start"
      >
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
          <span className="text-sm font-medium text-foreground">{label}</span>
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
        <div className="max-h-48 overflow-y-auto space-y-1 scrollbar-thin">
          {options.map((option) => (
            <label
              key={option}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors",
                "hover:bg-muted",
                selected.includes(option) && "bg-primary/5"
              )}
            >
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
                className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-foreground">{option}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
