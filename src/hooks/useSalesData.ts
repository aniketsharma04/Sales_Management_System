import { useState, useMemo, useCallback } from 'react';
import { SalesRecord, FilterState, SortState, PaginationState, SalesStats } from '@/types/sales';
import { mockSalesData } from '@/data/mockSalesData';

const PAGE_SIZE = 10;

const initialFilterState: FilterState = {
  customerRegion: [],
  gender: [],
  ageRange: null,
  productCategory: [],
  tags: [],
  paymentMethod: [],
  dateRange: null,
};

const initialSortState: SortState = {
  field: 'date',
  order: 'desc',
};

export const useSalesData = () => {
  const [data] = useState<SalesRecord[]>(mockSalesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [sort, setSort] = useState<SortState>(initialSortState);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique values for filter options
  const filterOptions = useMemo(() => ({
    customerRegion: [...new Set(data.map(d => d.customerRegion))].sort(),
    gender: [...new Set(data.map(d => d.gender))].sort(),
    productCategory: [...new Set(data.map(d => d.productCategory))].sort(),
    tags: [...new Set(data.map(d => d.tags))].sort(),
    paymentMethod: [...new Set(data.map(d => d.paymentMethod))].sort(),
    ageRange: {
      min: Math.min(...data.map(d => d.age)),
      max: Math.max(...data.map(d => d.age)),
    },
    dateRange: {
      min: data.reduce((min, d) => d.date < min ? d.date : min, data[0]?.date || ''),
      max: data.reduce((max, d) => d.date > max ? d.date : max, data[0]?.date || ''),
    },
  }), [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(record => {
      // Search filter (case-insensitive)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = record.customerName.toLowerCase().includes(query);
        const matchesPhone = record.phoneNumber.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone) return false;
      }

      // Customer Region filter
      if (filters.customerRegion.length > 0 && !filters.customerRegion.includes(record.customerRegion)) {
        return false;
      }

      // Gender filter
      if (filters.gender.length > 0 && !filters.gender.includes(record.gender)) {
        return false;
      }

      // Age Range filter
      if (filters.ageRange) {
        const [minAge, maxAge] = filters.ageRange;
        if (record.age < minAge || record.age > maxAge) return false;
      }

      // Product Category filter
      if (filters.productCategory.length > 0 && !filters.productCategory.includes(record.productCategory)) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.includes(record.tags)) {
        return false;
      }

      // Payment Method filter
      if (filters.paymentMethod.length > 0 && !filters.paymentMethod.includes(record.paymentMethod)) {
        return false;
      }

      // Date Range filter
      if (filters.dateRange) {
        const [startDate, endDate] = filters.dateRange;
        if (record.date < startDate || record.date > endDate) return false;
      }

      return true;
    });
  }, [data, searchQuery, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sort.field) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
        case 'customerName':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
        default:
          comparison = 0;
      }
      
      return sort.order === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [filteredData, sort]);

  // Calculate stats from filtered data
  const stats: SalesStats = useMemo(() => {
    return filteredData.reduce(
      (acc, record) => ({
        totalUnitsSold: acc.totalUnitsSold + record.quantity,
        totalAmount: acc.totalAmount + record.totalAmount,
        totalDiscount: acc.totalDiscount + (record.totalAmount - record.finalAmount),
      }),
      { totalUnitsSold: 0, totalAmount: 0, totalDiscount: 0 }
    );
  }, [filteredData]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedData, currentPage]);

  // Pagination state
  const pagination: PaginationState = useMemo(() => ({
    currentPage,
    pageSize: PAGE_SIZE,
    totalItems: sortedData.length,
    totalPages: Math.ceil(sortedData.length / PAGE_SIZE),
  }), [currentPage, sortedData.length]);

  // Update search
  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilterState);
    setCurrentPage(1);
  }, []);

  // Update sort
  const updateSort = useCallback((field: SortState['field'], order?: SortState['order']) => {
    setSort(prev => ({
      field,
      order: order || (prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'),
    }));
    setCurrentPage(1); // Reset to first page on sort change
  }, []);

  // Pagination controls
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, pagination.totalPages)));
  }, [pagination.totalPages]);

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    data: paginatedData,
    allData: sortedData,
    stats,
    searchQuery,
    filters,
    sort,
    pagination,
    filterOptions,
    updateSearch,
    updateFilters,
    clearFilters,
    updateSort,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
};
