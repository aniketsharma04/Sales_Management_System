import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortField, SortOrder } from '@/types/sales';
import { cn } from '@/lib/utils';

interface SortOption {
  label: string;
  field: SortField;
  order: SortOrder;
}

const sortOptions: SortOption[] = [
  { label: 'Date (Newest First)', field: 'date', order: 'desc' },
  { label: 'Date (Oldest First)', field: 'date', order: 'asc' },
  { label: 'Quantity (High to Low)', field: 'quantity', order: 'desc' },
  { label: 'Quantity (Low to High)', field: 'quantity', order: 'asc' },
  { label: 'Customer Name (A-Z)', field: 'customerName', order: 'asc' },
  { label: 'Customer Name (Z-A)', field: 'customerName', order: 'desc' },
];

interface SortDropdownProps {
  field: SortField;
  order: SortOrder;
  onChange: (field: SortField, order: SortOrder) => void;
}

export const SortDropdown = ({ field, order, onChange }: SortDropdownProps) => {
  const currentOption = sortOptions.find(opt => opt.field === field && opt.order === order);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 text-sm font-normal border-primary bg-primary/5 text-primary hover:bg-primary/10"
        >
          Sort by: {currentOption?.label || 'Select'}
          <ChevronDown className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
        {sortOptions.map((option) => {
          const isSelected = option.field === field && option.order === order;
          return (
            <DropdownMenuItem
              key={`${option.field}-${option.order}`}
              onClick={() => onChange(option.field, option.order)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                isSelected && "bg-primary/5"
              )}
            >
              <span className="text-sm text-foreground">{option.label}</span>
              {isSelected && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
