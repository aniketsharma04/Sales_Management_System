import { SalesRecord } from '@/types/sales';
import { Copy, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface SalesTableProps {
  data: SalesRecord[];
  isLoading?: boolean;
}

const formatCurrency = (value: number): string => {
  return `₹ ${value.toLocaleString('en-IN')}`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '-');
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({
    title: "Copied!",
    description: `"${text}" copied to clipboard`,
    duration: 2000,
  });
};

export const SalesTable = ({ data, isLoading }: SalesTableProps) => {
  if (data.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header hover:bg-table-header border-b border-table-border">
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Transaction ID</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Date</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Customer ID</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Customer name</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Phone Number</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Gender</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Age</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Product Category</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Quantity</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Total Amount</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Customer region</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Product ID</TableHead>
              <TableHead className="font-semibold text-foreground whitespace-nowrap">Employee name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record, index) => (
              <TableRow 
                key={record.transactionId}
                className={cn(
                  "border-b border-table-border hover:bg-table-row-hover transition-colors",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <TableCell className="font-medium text-foreground whitespace-nowrap">
                  {record.transactionId}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {formatDate(record.date)}
                </TableCell>
                <TableCell className="text-primary font-medium whitespace-nowrap">
                  {record.customerId}
                </TableCell>
                <TableCell className="text-foreground whitespace-nowrap">
                  {record.customerName}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{record.phoneNumber}</span>
                    <button
                      onClick={() => copyToClipboard(record.phoneNumber)}
                      className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {record.gender}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {record.age}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="font-medium text-foreground">{record.productCategory}</span>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap text-center">
                  {String(record.quantity).padStart(2, '0')}
                </TableCell>
                <TableCell className="text-foreground font-medium whitespace-nowrap">
                  {formatCurrency(record.totalAmount)}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {record.customerRegion}
                </TableCell>
                <TableCell className="text-foreground font-medium whitespace-nowrap">
                  {record.productId}
                </TableCell>
                <TableCell className="text-foreground whitespace-nowrap">
                  {record.employeeName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
