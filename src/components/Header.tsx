import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Pill, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (tab: 'login' | 'signup') => void;
}

export function Header({ onOpenAuth }: HeaderProps) {
  const { currentUser, logout } = useApp();

  return (
    <header className="gradient-primary text-primary-foreground py-5 px-6 md:px-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Pill className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight">BookMyCare</span>
        </div>
        
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="bg-primary-foreground/20 px-4 py-2 rounded-full text-sm font-medium">
                {currentUser.name}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
                className="btn-hover"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onOpenAuth('login')}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 btn-hover"
              >
                Login
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onOpenAuth('signup')}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 btn-hover"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
