import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { User } from '@/types';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab: 'login' | 'signup';
}

export function AuthModal({ open, onOpenChange, initialTab }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const { login, signup } = useApp();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<string>('Patient');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState<User['role']>('Patient');

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (login(loginEmail, loginPassword)) {
      toast.success('Welcome back!');
      onOpenChange(false);
      resetForms();
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleSignup = () => {
    if (!signupName || !signupEmail || !signupPhone || !signupPassword || !signupConfirmPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (signup(signupName, signupEmail, signupPhone, signupPassword, signupRole)) {
      toast.success('Account created! Please login');
      setActiveTab('login');
      setSignupName('');
      setSignupEmail('');
      setSignupPhone('');
      setSignupPassword('');
      setSignupConfirmPassword('');
    } else {
      toast.error('Email already registered');
    }
  };

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPhone('');
    setSignupPassword('');
    setSignupConfirmPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl gradient-primary-text font-bold">
            BookMyCare
          </DialogTitle>
        </DialogHeader>

        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={cn(
              'flex-1 py-3 font-semibold transition-all border-b-2',
              activeTab === 'login'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent'
            )}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={cn(
              'flex-1 py-3 font-semibold transition-all border-b-2',
              activeTab === 'signup'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent'
            )}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? (
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Login As</Label>
              <Select value={loginRole} onValueChange={setLoginRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Patient">Patient</SelectItem>
                  <SelectItem value="Donor">Blood Donor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleLogin} className="w-full btn-hover">
              Login
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
              />
            </div>
            <div>
              <Label>Password (min 6 characters)</Label>
              <Input
                type="password"
                placeholder="Create a password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Register As</Label>
              <Select value={signupRole} onValueChange={(v) => setSignupRole(v as User['role'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Patient">Patient</SelectItem>
                  <SelectItem value="Donor">Blood Donor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSignup} className="w-full btn-hover">
              Create Account
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
