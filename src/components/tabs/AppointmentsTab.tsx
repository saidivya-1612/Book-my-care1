import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const hospitals = [
  'Apollo Hospitals',
  'Fortis Healthcare',
  'Max Healthcare',
  'Manipal Hospitals',
  'CARE Hospitals',
  'Medanta - The Medicity',
  'KIMS Hospitals',
  'Yashoda Hospitals',
];

const specializations = [
  'Cardiologist',
  'Dentist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
];

export function AppointmentsTab() {
  const { currentUser, appointments, addAppointment, getTodayAppointments, addAlert } = useApp();

  const [patientName, setPatientName] = useState('');
  const [hospital, setHospital] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState('');
  const [contact, setContact] = useState('');
  const [queueInfo, setQueueInfo] = useState<{ show: boolean; count: number; waiting: number; full: boolean }>({
    show: false,
    count: 0,
    waiting: 0,
    full: false,
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (hospital && specialty && date) {
      const todayAppts = getTodayAppointments(hospital, specialty, date);
      const completedCount = todayAppts.filter(a => a.status === 'Completed').length;
      setQueueInfo({
        show: true,
        count: todayAppts.length,
        waiting: todayAppts.length - completedCount,
        full: todayAppts.length >= 20,
      });
    } else {
      setQueueInfo({ show: false, count: 0, waiting: 0, full: false });
    }
  }, [hospital, specialty, date, getTodayAppointments]);

  const handleBookAppointment = () => {
    if (!patientName || !hospital || !specialty || !date || !contact) {
      toast.error('Please fill all fields');
      return;
    }

    const selectedDate = new Date(date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
      toast.error('Cannot book appointment for past dates');
      return;
    }

    if (queueInfo.full) {
      toast.warning('All appointments are booked! Added to waitlist');
      addAlert(`⚠️ Waitlist: Appointment request for ${specialty} at ${hospital} on ${date}. Will notify when slot available.`);
      return;
    }

    const appointmentNumber = queueInfo.count + 1;

    addAppointment({
      name: patientName,
      hospital,
      specialty,
      date,
      appointmentNumber: `OP ${appointmentNumber}`,
      contact,
      user: currentUser!.email,
      status: 'Confirmed',
      reminderSent: false,
      finalReminderSent: false,
      bookedAt: new Date().toISOString(),
    });

    addAlert(`✅ Appointment confirmed! Your appointment number is OP ${appointmentNumber} with ${specialty} at ${hospital} on ${date}`);
    addAlert(`🔔 Queue monitoring activated: We'll notify you when your turn approaches`);
    toast.success(`Appointment booked! Your number is OP ${appointmentNumber}`);

    setPatientName('');
    setHospital('');
    setSpecialty('');
    setDate('');
    setContact('');
  };

  const userAppointments = appointments.filter(a => a.user === currentUser?.email);

  return (
    <div className="grid gap-6 lg:grid-cols-2 animate-fade-in">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          📅 Book Appointment
        </h3>

        <div className="space-y-4">
          <div>
            <Label>Patient Name</Label>
            <Input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <Label>Select Hospital</Label>
            <Select value={hospital} onValueChange={setHospital}>
              <SelectTrigger>
                <SelectValue placeholder="Select Hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((h) => (
                  <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Specialization</Label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
            />
          </div>

          <div>
            <Label>Contact</Label>
            <Input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>

          {queueInfo.show && (
            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">📋 Current Queue Status</h4>
              {queueInfo.count === 0 ? (
                <p className="text-success">✅ <strong>No queue!</strong> You'll be the first appointment today.</p>
              ) : queueInfo.full ? (
                <p className="text-destructive">⚠️ <strong>Queue Full!</strong> Maximum 20 appointments reached for today.</p>
              ) : (
                <div className="text-sm space-y-1">
                  <p>📊 <strong>Current Status:</strong></p>
                  <p>• Appointments in Queue: {queueInfo.waiting}</p>
                  <p>• Estimated Wait Time: ~{queueInfo.waiting * 15} minutes</p>
                </div>
              )}
              <div className="mt-3 p-3 bg-card rounded-md">
                <strong>Your Appointment Number will be: </strong>
                <span className="text-primary text-xl font-bold">
                  {queueInfo.full ? 'FULL' : `OP ${queueInfo.count + 1}`}
                </span>
              </div>
            </div>
          )}

          <Button onClick={handleBookAppointment} className="w-full bg-success hover:bg-success/90 btn-hover">
            Book Appointment
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Your Appointments</h3>
        <div className="space-y-4">
          {userAppointments.length === 0 ? (
            <p className="text-muted-foreground">No appointments yet</p>
          ) : (
            userAppointments.map((appt) => (
              <div key={appt.id} className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                <h4 className="font-semibold">{appt.name} - {appt.specialty}</h4>
                <p className="text-sm text-muted-foreground">🏥 {appt.hospital}</p>
                <p className="text-sm text-muted-foreground">📅 {appt.date}</p>
                <p className="text-sm text-muted-foreground">🎫 {appt.appointmentNumber}</p>
                <p className="text-sm text-muted-foreground">📞 {appt.contact}</p>
                <p className="text-sm font-medium text-success mt-2">Status: {appt.status}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
