import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Bell } from 'lucide-react';

export function AlertsTab() {
  const { alerts, currentUser } = useApp();

  // Filter alerts by current user's email
  const userAlerts = alerts.filter(alert => alert.userEmail === currentUser?.email);

  return (
    <div className="animate-fade-in">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          All Notifications & Alerts
        </h3>
        <div className="space-y-4">
          {userAlerts.length === 0 ? (
            <p className="text-muted-foreground">No alerts yet</p>
          ) : (
            userAlerts.map((alert) => (
              <div key={alert.id} className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-medium">{alert.message}</h4>
                <p className="text-sm text-muted-foreground mt-1">🕐 {alert.timestamp}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
