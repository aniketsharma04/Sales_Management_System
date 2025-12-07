# Architecture Documentation

## Overview

The Sales Management System follows a modular, component-based architecture using React with TypeScript. The application is structured for maintainability, scalability, and separation of concerns.

## Backend Architecture

This is a frontend-only application with mock data. In a production environment, the backend would:

- Expose RESTful API endpoints for CRUD operations
- Handle search, filter, sort, and pagination on the server
- Connect to a database for persistent storage
- Implement authentication and authorization

### API Design (Conceptual)

```
GET /api/sales
  Query Parameters:
  - search: string (Customer Name, Phone Number)
  - customerRegion: string[] (multi-select)
  - gender: string[] (multi-select)
  - ageMin, ageMax: number (range)
  - productCategory: string[] (multi-select)
  - tags: string[] (multi-select)
  - paymentMethod: string[] (multi-select)
  - startDate, endDate: string (date range)
  - sortBy: 'date' | 'quantity' | 'customerName'
  - sortOrder: 'asc' | 'desc'
  - page: number
  - pageSize: number (default: 10)
```

## Frontend Architecture

### Component Hierarchy

```
App
├── TooltipProvider
├── Toaster (notifications)
├── BrowserRouter
│   └── Routes
│       ├── Index (main page)
│       │   ├── Sidebar
│       │   ├── Header
│       │   │   └── SearchBar
│       │   ├── FilterBar
│       │   │   ├── FilterDropdown (multiple)
│       │   │   ├── AgeRangeFilter
│       │   │   ├── DateRangeFilter
│       │   │   └── SortDropdown
│       │   ├── StatsCards
│       │   ├── SalesTable
│       │   └── Pagination
│       └── NotFound (404)
```

### State Management

Uses React's built-in hooks for state management:

- **useSalesData Hook**: Central hook managing all data operations
  - Search state
  - Filter state
  - Sort state
  - Pagination state
  - Computed/derived data (filtered, sorted, paginated)

### Data Flow

```
User Action (search/filter/sort/paginate)
    ↓
State Update in useSalesData hook
    ↓
Memoized Computation (useMemo)
    ↓
Filtered → Sorted → Paginated Data
    ↓
Component Re-render with new data
```

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx          # Navigation sidebar
│   ├── sales/
│   │   ├── SearchBar.tsx        # Search input component
│   │   ├── FilterBar.tsx        # Filter controls container
│   │   ├── FilterDropdown.tsx   # Multi-select filter dropdown
│   │   ├── AgeRangeFilter.tsx   # Age range slider filter
│   │   ├── DateRangeFilter.tsx  # Date range picker filter
│   │   ├── SortDropdown.tsx     # Sort options dropdown
│   │   ├── StatsCards.tsx       # Summary statistics display
│   │   ├── SalesTable.tsx       # Data table component
│   │   └── Pagination.tsx       # Pagination controls
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── dropdown-menu.tsx
│       ├── popover.tsx
│       ├── slider.tsx
│       ├── table.tsx
│       └── ...
├── data/
│   └── mockSalesData.ts         # Mock data generator
├── hooks/
│   ├── useSalesData.ts          # Main data management hook
│   └── use-toast.ts             # Toast notifications hook
├── lib/
│   └── utils.ts                 # Utility functions (cn)
├── pages/
│   ├── Index.tsx                # Main dashboard page
│   └── NotFound.tsx             # 404 page
├── types/
│   └── sales.ts                 # TypeScript type definitions
├── App.tsx                      # Root component with routing
├── main.tsx                     # Entry point
└── index.css                    # Global styles & design system
```

## Module Responsibilities

### Types (`/types/sales.ts`)
- Defines TypeScript interfaces for SalesRecord, FilterState, SortState, PaginationState
- Ensures type safety across the application

### Data (`/data/mockSalesData.ts`)
- Generates realistic mock sales data
- Provides data structure matching assignment requirements

### Hooks (`/hooks/useSalesData.ts`)
- Central data management logic
- Search filtering (case-insensitive)
- Multi-select and range filtering
- Sorting with multiple fields
- Pagination calculations
- Memoized computations for performance

### Components (`/components/`)
- **Layout**: Sidebar navigation
- **Sales**: Feature-specific components
- **UI**: Reusable shadcn/ui components

### Pages (`/pages/`)
- Page-level components that compose feature components

## Design System

Defined in `index.css` and `tailwind.config.ts`:
- HSL-based color tokens
- Semantic color variables (primary, secondary, muted, etc.)
- Custom table and sidebar color tokens
- CSS animations for smooth transitions

## Performance Optimizations

1. **useMemo**: All filtered, sorted, and paginated data is memoized
2. **useCallback**: Event handlers are memoized to prevent unnecessary re-renders
3. **Pagination**: Only renders 10 items at a time
4. **CSS Animations**: GPU-accelerated animations using transforms
