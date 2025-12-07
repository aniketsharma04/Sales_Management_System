import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Zap, 
  Download, 
  FolderOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Receipt,
  FileCheck,
  User
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  isActive?: boolean;
  children?: { label: string; icon: React.ReactNode; href?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, href: '/' },
  { label: 'Nexus', icon: <Zap className="w-4 h-4" />, href: '#' },
  { label: 'Intake', icon: <Download className="w-4 h-4" />, href: '#' },
  { 
    label: 'Services', 
    icon: <FolderOpen className="w-4 h-4" />,
    children: [
      { label: 'Pre-active', icon: <Clock className="w-4 h-4" />, href: '#' },
      { label: 'Active', icon: <CheckCircle2 className="w-4 h-4" />, href: '#' },
      { label: 'Blocked', icon: <XCircle className="w-4 h-4" />, href: '#' },
      { label: 'Closed', icon: <FileText className="w-4 h-4" />, href: '#' },
    ]
  },
  { 
    label: 'Invoices', 
    icon: <Receipt className="w-4 h-4" />,
    children: [
      { label: 'Proforma Invoices', icon: <FileText className="w-4 h-4" />, href: '#' },
      { label: 'Final Invoices', icon: <FileCheck className="w-4 h-4" />, href: '#' },
    ]
  },
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Services', 'Invoices']);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="w-56 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo / Brand */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground font-semibold text-sm">Vault</span>
            <span className="text-sidebar-muted text-xs">Anurag Yadav</span>
          </div>
          <ChevronDown className="w-4 h-4 text-sidebar-muted ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.children && toggleExpand(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                item.isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <span className="text-sidebar-muted">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.children && (
                expandedItems.includes(item.label) 
                  ? <ChevronDown className="w-4 h-4 text-sidebar-muted" />
                  : <ChevronRight className="w-4 h-4 text-sidebar-muted" />
              )}
            </button>
            
            {item.children && expandedItems.includes(item.label) && (
              <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                {item.children.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                  >
                    <span className="text-sidebar-muted">{child.icon}</span>
                    <span>{child.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="w-4 h-4 text-sidebar-muted" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-sidebar-foreground">Admin</p>
            <p className="text-xs text-sidebar-muted">admin@vault.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
