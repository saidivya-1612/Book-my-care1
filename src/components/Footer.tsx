import { TabName } from '@/types';

interface FooterProps {
  onTabChange: (tab: TabName) => void;
}

export function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-foreground text-background mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-primary text-lg font-semibold mb-4">About BookMyCare</h3>
            <p className="text-muted leading-relaxed">
              Your trusted healthcare management platform. We provide seamless appointment booking, blood donation services, and medicine delivery.
            </p>
          </div>

          <div>
            <h3 className="text-primary text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button onClick={() => onTabChange('appointments')} className="block text-muted hover:text-background transition-colors">
                Book Appointment
              </button>
              <button onClick={() => onTabChange('blood')} className="block text-muted hover:text-background transition-colors">
                Blood Donation
              </button>
              <button onClick={() => onTabChange('medicine')} className="block text-muted hover:text-background transition-colors">
                Order Medicine
              </button>
              <button onClick={() => onTabChange('alerts')} className="block text-muted hover:text-background transition-colors">
                View Alerts
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-primary text-lg font-semibold mb-4">Services</h3>
            <div className="space-y-2 text-muted">
              <p>✓ 24/7 Emergency Support</p>
              <p>✓ Expert Consultations</p>
              <p>✓ Same-day Medicine Delivery</p>
              <p>✓ Blood Donor Network</p>
            </div>
          </div>

          <div>
            <h3 className="text-primary text-lg font-semibold mb-4">Contact & Helpline</h3>
            <div className="space-y-2 text-muted">
              <p>📞 Emergency: 108</p>
              <p>📞 Helpline: 1800-123-4567</p>
              <p>📧 Email: support@bookmycare.com</p>
              <p>⏰ Available: 24/7</p>
              <p>📍 Address: Hyderabad, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-muted/30 mt-10 pt-6 text-center text-muted">
          <p>© 2025 BookMyCare. All rights reserved. | Your Health, Our Priority</p>
        </div>
      </div>
    </footer>
  );
}
