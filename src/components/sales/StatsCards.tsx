import { SalesStats } from '@/types/sales';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StatsCardsProps {
  stats: SalesStats;
  totalRecords: number;
}

const formatCurrency = (value: number): string => {
  return `₹${value.toLocaleString('en-IN')}`;
};

const formatCount = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export const StatsCards = ({ stats, totalRecords }: StatsCardsProps) => {
  const cards = [
    {
      label: 'Total units sold',
      value: stats.totalUnitsSold.toString(),
      tooltip: 'Total quantity of all products sold',
    },
    {
      label: 'Total Amount',
      value: formatCurrency(stats.totalAmount),
      subValue: `(${totalRecords} SRs)`,
      tooltip: 'Sum of all transaction amounts before discounts',
    },
    {
      label: 'Total Discount',
      value: formatCurrency(stats.totalDiscount),
      subValue: `(${totalRecords} SRs)`,
      tooltip: 'Total discount applied across all transactions',
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center gap-4 px-5 py-3 bg-card border border-border rounded-lg shadow-sm"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{card.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-semibold text-foreground">{card.value}</span>
              {card.subValue && (
                <span className="text-sm text-muted-foreground">{card.subValue}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
