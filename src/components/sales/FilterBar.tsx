import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilterDropdown } from './FilterDropdown';
import { DateRangeFilter } from './DateRangeFilter';
import { AgeRangeFilter } from './AgeRangeFilter';
import { SortDropdown } from './SortDropdown';
import { FilterState, SortState } from '@/types/sales';

interface FilterBarProps {
  filters: FilterState;
  sort: SortState;
  filterOptions: {
    customerRegion: string[];
    gender: string[];
    productCategory: string[];
    tags: string[];
    paymentMethod: string[];
    ageRange: { min: number; max: number };
    dateRange: { min: string; max: string };
  };
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSortChange: (field: SortState['field'], order: SortState['order']) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  filters,
  sort,
  filterOptions,
  onFilterChange,
  onSortChange,
  onClearFilters,
}: FilterBarProps) => {
  const hasActiveFilters = 
    filters.customerRegion.length > 0 ||
    filters.gender.length > 0 ||
    filters.ageRange !== null ||
    filters.productCategory.length > 0 ||
    filters.tags.length > 0 ||
    filters.paymentMethod.length > 0 ||
    filters.dateRange !== null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Reset
      </Button>

      <FilterDropdown
        label="Customer Region"
        options={filterOptions.customerRegion}
        selected={filters.customerRegion}
        onChange={(selected) => onFilterChange({ customerRegion: selected })}
      />

      <FilterDropdown
        label="Gender"
        options={filterOptions.gender}
        selected={filters.gender}
        onChange={(selected) => onFilterChange({ gender: selected })}
      />

      <AgeRangeFilter
        value={filters.ageRange}
        onChange={(range) => onFilterChange({ ageRange: range })}
        min={filterOptions.ageRange.min}
        max={filterOptions.ageRange.max}
      />

      <FilterDropdown
        label="Product Category"
        options={filterOptions.productCategory}
        selected={filters.productCategory}
        onChange={(selected) => onFilterChange({ productCategory: selected })}
      />

      <FilterDropdown
        label="Tags"
        options={filterOptions.tags}
        selected={filters.tags}
        onChange={(selected) => onFilterChange({ tags: selected })}
      />

      <FilterDropdown
        label="Payment Method"
        options={filterOptions.paymentMethod}
        selected={filters.paymentMethod}
        onChange={(selected) => onFilterChange({ paymentMethod: selected })}
      />

      <DateRangeFilter
        value={filters.dateRange}
        onChange={(range) => onFilterChange({ dateRange: range })}
      />

      <div className="flex-1" />

      <SortDropdown
        field={sort.field}
        order={sort.order}
        onChange={onSortChange}
      />
    </div>
  );
};
