# Sales Management System

A comprehensive Retail Sales Management System built with React, TypeScript, and Tailwind CSS. Features advanced search, multi-select filtering, sorting, and pagination for managing sales transactions.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Hooks (useState, useMemo, useCallback)
- **Routing**: React Router DOM
- **Date Handling**: date-fns

## Search Implementation Summary

Full-text search across Customer Name and Phone Number fields:
- Case-insensitive matching using `toLowerCase()`
- Real-time filtering as user types
- Maintains state with active filters and sorting
- Clear search functionality with X button

## Filter Implementation Summary

Multi-select and range-based filtering:
- **Customer Region**: Multi-select dropdown
- **Gender**: Multi-select dropdown
- **Age Range**: Slider with min/max values
- **Product Category**: Multi-select dropdown
- **Tags**: Multi-select dropdown
- **Payment Method**: Multi-select dropdown
- **Date Range**: Calendar-based date picker

Filters work independently and in combination, preserving state across search and sort operations.

## Sorting Implementation Summary

Sorting available for:
- **Date**: Newest First / Oldest First
- **Quantity**: High to Low / Low to High
- **Customer Name**: A-Z / Z-A

Sort state persists with active search and filter criteria.

## Pagination Implementation Summary

- Page size: 10 items per page
- Next/Previous navigation buttons
- Direct page number navigation
- Shows current range (e.g., "Showing 1 to 10 of 150 results")
- Retains active search, filter, and sort states

## Setup Instructions

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd sales-management-system

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:8080`
