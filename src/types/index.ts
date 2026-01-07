export interface User {
  name: string;
  email: string;
  password: string;
  role: 'Patient' | 'Doctor' | 'Donor' | 'Admin';
}

export interface Appointment {
  id: string;
  name: string;
  hospital: string;
  specialty: string;
  date: string;
  appointmentNumber: string;
  contact: string;
  user: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  reminderSent: boolean;
  finalReminderSent: boolean;
  bookedAt: string;
}

export interface Donor {
  id: string;
  name: string;
  blood: string;
  age: number;
  contact: string;
  area: string;
  user: string;
  registered: string;
}

export interface BloodRequest {
  id: string;
  name: string;
  blood: string;
  hospital: string;
  location: string;
  contact: string;
  user: string;
  requested: string;
}

export interface MedicineOrder {
  id: string;
  name: string;
  file: string;
  address: string;
  contact: string;
  time: string;
  user: string;
  status: 'Pending Verification' | 'Verified - Out for Delivery' | 'Delivered';
  ordered: string;
}

export interface Alert {
  id: string;
  message: string;
  timestamp: string;
}

export type TabName = 'home' | 'appointments' | 'blood' | 'medicine' | 'alerts';
