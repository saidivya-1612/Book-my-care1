import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Appointment, Donor, BloodRequest, MedicineOrder, Alert } from '@/types';

interface AppState {
  currentUser: User | null;
  users: User[];
  appointments: Appointment[];
  donors: Donor[];
  bloodRequests: BloodRequest[];
  medicines: MedicineOrder[];
  alerts: Alert[];
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: User['role']) => boolean;
  logout: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addDonor: (donor: Omit<Donor, 'id'>) => void;
  addBloodRequest: (request: Omit<BloodRequest, 'id'>) => void;
  addMedicine: (order: Omit<MedicineOrder, 'id'>) => void;
  updateMedicineStatus: (id: string, status: MedicineOrder['status']) => void;
  addAlert: (message: string) => void;
  getMatchingDonors: (bloodType: string, location: string) => Donor[];
  getTodayAppointments: (hospital: string, specialty: string, date: string) => Appointment[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substr(2, 9);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem('bookmycare_data');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      currentUser: null,
      users: [],
      appointments: [],
      donors: [],
      bloodRequests: [],
      medicines: [],
      alerts: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('bookmycare_data', JSON.stringify(state));
  }, [state]);

  const login = (email: string, password: string): boolean => {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: User['role']): boolean => {
    if (state.users.find(u => u.email === email)) {
      return false;
    }
    const newUser: User = { name, email, password, role };
    setState(prev => ({ ...prev, users: [...prev.users, newUser] }));
    return true;
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: generateId() };
    setState(prev => ({ ...prev, appointments: [...prev.appointments, newAppointment] }));
  };

  const addDonor = (donor: Omit<Donor, 'id'>) => {
    const newDonor = { ...donor, id: generateId() };
    setState(prev => ({ ...prev, donors: [...prev.donors, newDonor] }));
  };

  const addBloodRequest = (request: Omit<BloodRequest, 'id'>) => {
    const newRequest = { ...request, id: generateId() };
    setState(prev => ({ ...prev, bloodRequests: [...prev.bloodRequests, newRequest] }));
  };

  const addMedicine = (order: Omit<MedicineOrder, 'id'>) => {
    const newOrder = { ...order, id: generateId() };
    setState(prev => ({ ...prev, medicines: [...prev.medicines, newOrder] }));
  };

  const updateMedicineStatus = (id: string, status: MedicineOrder['status']) => {
    setState(prev => ({
      ...prev,
      medicines: prev.medicines.map(m => m.id === id ? { ...m, status } : m),
    }));
  };

  const addAlert = (message: string) => {
    const newAlert: Alert = {
      id: generateId(),
      message,
      timestamp: new Date().toLocaleString(),
    };
    setState(prev => ({ ...prev, alerts: [newAlert, ...prev.alerts] }));
  };

  const getMatchingDonors = (bloodType: string, location: string): Donor[] => {
    return state.donors.filter(
      d => d.blood === bloodType && d.area.toLowerCase().includes(location.toLowerCase())
    );
  };

  const getTodayAppointments = (hospital: string, specialty: string, date: string): Appointment[] => {
    return state.appointments.filter(
      a => a.hospital === hospital && a.specialty === specialty && a.date === date
    );
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        addAppointment,
        addDonor,
        addBloodRequest,
        addMedicine,
        updateMedicineStatus,
        addAlert,
        getMatchingDonors,
        getTodayAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
