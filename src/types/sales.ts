export interface SalesRecord {
  transactionId: string;
  date: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  customerRegion: string;
  customerType: string;
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string;
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}

export interface FilterState {
  customerRegion: string[];
  gender: string[];
  ageRange: [number, number] | null;
  productCategory: string[];
  tags: string[];
  paymentMethod: string[];
  dateRange: [string, string] | null;
}

export type SortField = 'date' | 'quantity' | 'customerName';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface SalesStats {
  totalUnitsSold: number;
  totalAmount: number;
  totalDiscount: number;
}
