import { Sidebar } from '@/components/layout/Sidebar';
import { SearchBar } from '@/components/sales/SearchBar';
import { StatsCards } from '@/components/sales/StatsCards';
import { FilterBar } from '@/components/sales/FilterBar';
import { SalesTable } from '@/components/sales/SalesTable';
import { Pagination } from '@/components/sales/Pagination';
import { useSalesData } from '@/hooks/useSalesData';
import { User } from 'lucide-react';

const Index = () => {
  const {
    data,
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
  } = useSalesData();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <h1 className="text-xl font-semibold text-foreground">
            Sales Management System
          </h1>
          
          <div className="flex items-center gap-4">
            <SearchBar
              value={searchQuery}
              onChange={updateSearch}
              className="w-64"
            />
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary/20">
              <span className="text-primary-foreground font-semibold text-sm">R</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Filters */}
          <FilterBar
            filters={filters}
            sort={sort}
            filterOptions={filterOptions}
            onFilterChange={updateFilters}
            onSortChange={updateSort}
            onClearFilters={clearFilters}
          />

          {/* Stats */}
          <StatsCards stats={stats} totalRecords={pagination.totalItems} />

          {/* Table */}
          <div className="rounded-lg overflow-hidden shadow-sm">
            <SalesTable data={data} />
            <Pagination
              pagination={pagination}
              onPageChange={goToPage}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
