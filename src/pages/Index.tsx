import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { AuthModal } from '@/components/AuthModal';
import { Footer } from '@/components/Footer';
import { HomeTab } from '@/components/tabs/HomeTab';
import { AppointmentsTab } from '@/components/tabs/AppointmentsTab';
import { BloodTab } from '@/components/tabs/BloodTab';
import { MedicineTab } from '@/components/tabs/MedicineTab';
import { AlertsTab } from '@/components/tabs/AlertsTab';
import { TabName } from '@/types';
import { toast } from 'sonner';

function AppContent() {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: 'login' | 'signup' }>({
    open: false,
    tab: 'login',
  });

  const handleTabChange = (tab: TabName) => {
    if (tab !== 'home' && !currentUser) {
      toast.warning('Please login first');
      setAuthModal({ open: true, tab: 'login' });
      return;
    }
    setActiveTab(tab);
  };

  const openAuth = (tab: 'login' | 'signup') => {
    setAuthModal({ open: true, tab });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenAuth={openAuth} />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 container py-8">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'appointments' && <AppointmentsTab />}
        {activeTab === 'blood' && <BloodTab />}
        {activeTab === 'medicine' && <MedicineTab />}
        {activeTab === 'alerts' && <AlertsTab />}
      </main>

      <Footer onTabChange={handleTabChange} />

      <AuthModal
        open={authModal.open}
        onOpenChange={(open) => setAuthModal((prev) => ({ ...prev, open }))}
        initialTab={authModal.tab}
      />
    </div>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
