import { TabName } from '@/types';
import { Home, Calendar, Droplets, Pill, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const tabs: { name: TabName; label: string; icon: React.ReactNode }[] = [
  { name: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { name: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
  { name: 'blood', label: 'Blood Donation', icon: <Droplets className="w-4 h-4" /> },
  { name: 'medicine', label: 'Medicine', icon: <Pill className="w-4 h-4" /> },
  { name: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-card border-b-2 border-border sticky top-0 z-40 overflow-x-auto">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => onTabChange(tab.name)}
            className={cn(
              'flex items-center gap-2 px-4 md:px-6 py-4 font-semibold text-sm transition-all border-b-3 whitespace-nowrap',
              activeTab === tab.name
                ? 'text-primary border-b-[3px] border-primary bg-muted/50'
                : 'text-muted-foreground border-b-[3px] border-transparent hover:text-foreground hover:bg-muted/30'
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
