import { useState } from 'react';
import { CalendarDays, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DateRangeFilterProps {
  value: [string, string] | null;
  onChange: (range: [string, string] | null) => void;
}

export const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: value ? new Date(value[0]) : undefined,
    to: value ? new Date(value[1]) : undefined,
  });

  const handleSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    if (range) {
      setDateRange(range);
      if (range.from && range.to) {
        onChange([
          format(range.from, 'yyyy-MM-dd'),
          format(range.to, 'yyyy-MM-dd'),
        ]);
      }
    }
  };

  const clearSelection = () => {
    setDateRange({ from: undefined, to: undefined });
    onChange(null);
    setOpen(false);
  };

  const hasSelection = value !== null;

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
          <CalendarDays className="w-3.5 h-3.5" />
          Date
          {hasSelection && (
            <span className="ml-1 text-xs text-primary">
              {format(new Date(value[0]), 'MMM d')} - {format(new Date(value[1]), 'MMM d')}
            </span>
          )}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Select Date Range</span>
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
        <Calendar
          mode="range"
          selected={{ from: dateRange.from, to: dateRange.to }}
          onSelect={handleSelect as any}
          numberOfMonths={2}
          className="p-3"
        />
      </PopoverContent>
    </Popover>
  );
};
